"use strict";

const encode = require("image-encode");
const decode = require("image-decode");
const FileType = require("file-type");
const { parse, dirname, basename, join } = require("path");
const { homedir } = require("os");
const { promisify } = require("util");
const { stat: st, readFile: rF, writeFile: wF } = require("fs");
const stat = promisify(st),
  readFile = promisify(rF),
  writeFile = promisify(wF);

module.exports = mosh;

async function mosh(...args) {
  // it's cool cuz it's nerdy.
  const [err, write, source, mode, ext] = await preflightChecks(...args);

  // callback with error if using cb, else throw
  if (err) {
    handleError(err, write);
    return;
  }

  // decode image
  const { data, width, height } = decode(source);

  // apply moshes
  let imgBuff = Buffer.from(data);
  mode.forEach((m) => {
    imgBuff = mosh.MODES[m](imgBuff, width, height);
  });

  // encode image
  const encodedMosh = encode(imgBuff, [width, height], ext);

  // return data if we aren't using a CB
  if (!write) return Buffer.from(encodedMosh);
  write(null, Buffer.from(encodedMosh));
}

async function preflightChecks(...args) {
  let [source, mode, write] = args;
  let ext;

  // source validation
  const sourceIsBuffer = Buffer.isBuffer(source);
  const sourceIsString = typeof source === "string" || source instanceof String;

  if (!source || (!sourceIsString && !sourceIsBuffer)) {
    return [
      "Invalid image source -- source must be of type String (path) or Buffer.",
      write,
    ];
  }

  if (sourceIsString) {
    const sourcePath = await validatePath(source);

    if (!sourcePath) {
      return [`Invalid source path: ${source}\nFile does not exist.`, write];
    }

    ext = parse(sourcePath).ext.replace(".", "");

    if (!validateExtension(ext)) {
      return [`Invalid file type: ${ext}`, write];
    }

    try {
      source = await readFile(sourcePath);
    } catch (err) {
      return [e.message, write];
    }
  }

  // ext validation
  if (!ext) {
    const fileType = await FileType.fromBuffer(source);

    if (fileType?.ext && validateExtension(fileType?.ext)) {
      ext = fileType.ext;
    } else {
      return [`Invalid file type, requires supported image file.`, write];
    }
  }

  // mode validation
  const modeIsString = typeof mode === "string" || mode instanceof String;
  const modeIsArray = Array.isArray(mode);

  if (mode && !modeIsString && !modeIsArray) {
    return [
      `Invalid mode: '${mode}'; mode must be of type String or Array.`,
      write,
    ];
  }

  if (mode && modeIsString) {
    if (!mosh.MODES[mode]) {
      return [`Invalid mosh mode: '${mode}'`, write];
    }

    mode = [mode];
  }

  if (mode && modeIsArray) {
    let e = [];
    mode.forEach((m, i) => {
      if (!mosh.MODES[m] && m != null) e.push(m);

      // assign random mode for any null values
      if (m === null) mode.splice(i, 1, randomMode());
    });

    if (e.length > 0) {
      return [`Invalid mosh modes: '${e.join(",")}'`, write];
    }
  }

  if (!mode) mode = [randomMode()];

  // write validation
  const writeIsString = typeof write === "string" || write instanceof String;
  const writeIsCb = write instanceof Function;

  if (write && !writeIsString && !writeIsCb) {
    return [`Invalid callback, or write path.`, write];
  }

  if (writeIsString) {
    // bubble up path errors
    const dir = dirname(write);
    const filename = basename(write);
    const writePath = await validatePath(dir);

    if (!writePath) {
      return [`Invalid write location: ${dir}`, write];
    }

    // prepare write function
    write = async (err, data) => {
      if (!err) await writeFile(join(writePath, filename), data);
      else throw err;
    };
  }

  return [null, write, source, mode, ext];
}

async function validatePath(fpath) {
  // match tilde to homedir
  if (fpath.startsWith("~/") || fpath === "~") {
    fpath = fpath.replace("~", homedir());
  }

  try {
    // stat will reject when the path is invalid
    await stat(fpath);
    return fpath;
  } catch (err) {
    return false;
  }
}

function randomMode() {
  const modeNames = Object.keys(mosh.MODES);
  return modeNames[Math.floor(Math.random() * modeNames.length)];
}

function validateExtension(ext) {
  return (
    /^jpg$/.test(ext) ||
    /^jpeg$/.test(ext) ||
    /^png$/.test(ext) ||
    /^gif$/.test(ext) ||
    /^tiff$/.test(ext) ||
    /^bmp/.test(ext)
  );
}

function handleError(msg, cb) {
  const usingCb = cb && cb instanceof Function;
  const error = new Error(msg);

  if (usingCb) cb(error);
  else throw error;
}

mosh.MODES = {
  blurbobb: require("./modes/blurbobb"),
  schifty: require("./modes/schifty"),
  veneneux: require("./modes/veneneux"),
  vana: require("./modes/vana"),
  fatcat: require("./modes/fatcat"),
  vaporwave: require("./modes/vaporwave"),
  walter: require("./modes/walter"),
  castles: require("./modes/castles"),
};
