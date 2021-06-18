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
  const [err, source, mode, write, ext] = await preflightChecks(...args);

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

  if (!write) return Buffer.from(encodedMosh);

  write(null, Buffer.from(encodedMosh));
}

async function preflightChecks(...args) {
  let [source, mode, write] = args;

  // validate source image; may be a buffer or path.
  let sourceIsPath, sourcePath, ext;
  if (
    !source ||
    (source &&
      !Buffer.isBuffer(source) &&
      !(sourceIsPath = source.constructor.name === "String"))
  ) {
    return [
      "Invalid image source -- source must be of type String (path) or Buffer.",
      null,
      null,
      write,
    ];
  }

  if (sourceIsPath) {
    if (!(sourcePath = await validatePath(source))) {
      return [
        `Invalid source path: ${source}\n\tFile does not exist.`,
        null,
        null,
        write,
      ];
    }

    ext = parse(sourcePath).ext.replace(".", "");

    if (!validateExtension(ext)) {
      return [`Invalid file type: ${ext}`, null, null, write];
    }

    // load image data
    try {
      source = await readFile(sourcePath);
    } catch (e) {
      return [e.message, null, null, write];
    }
  }

  // valid mode, if passed; checks against supported modes.
  let isString, isArray;
  if (
    mode &&
    !(isString = mode.constructor.name === "String") &&
    !(isArray = mode.constructor.name === "Array")
  ) {
    return [
      `Invalid mode: '${mode}'; mode must be of type String or Array.`,
      null,
      null,
      write,
    ];
  } else if (mode) {
    if (isArray) {
      let e = [];
      mode.forEach((m, i) => {
        if (!mosh.MODES[m] && m !== null) e.push(m);

        // assign random mode for any null values
        if (m === null) mode.splice(i, 1, randomMode());
      });

      if (e.length > 0)
        return [`Invalid mosh modes: '${e.join(",")}'`, null, null, write];
    }

    if (isString) {
      if (!mosh.MODES[mode])
        return [`Invalid mosh mode: '${mode}'`, null, null, write];

      mode = [mode];
    }
  }

  if (!mode) mode = [randomMode()];

  // ext may be passed instead of write for buffer return
  if (
    write &&
    write.constructor.name === "String" &&
    validateExtension(write.replace(".", ""))
  ) {
    ext = write;
    write = null;
  }

  if (!ext) {
    const fileType = await FileType.fromBuffer(source);

    if (fileType && fileType.ext && validateExtension(fileType.ext)) {
      ext = fileType.ext;
    } else {
      return [
        `Invalid file type, requires supported image file.`,
        null,
        null,
        write,
      ];
    }
  }

  // validate write, if passed; may be cb function or path.
  let writeIsPath, writePath;
  if (
    write &&
    !(writeIsPath = write.constructor.name === "String") &&
    write.constructor.name !== "Function"
  ) {
    return [`Invalid callback, or write path.`, null, null, write];
  }

  if (writeIsPath) {
    // bubble up path errors
    const dir = dirname(write);
    const filename = basename(write);

    if (!(writePath = await validatePath(dir))) {
      return [`Invalid write location: ${dir}`, null, null, write];
    }

    // prepare write function
    write = async (err, data) => {
      if (!err) await writeFile(join(writePath, filename), data);
      else throw err;
    };
  }

  return [null, source, mode, write, ext];
}

async function validatePath(fpath) {
  // match tilde to homedir
  if (fpath.startsWith("~/") || fpath === "~") {
    fpath = fpath.replace("~", homedir());
  }

  try {
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
  const usingCb = cb && cb.constructor.name === "Function";
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
};
