'use strict'

const Jimp = require('jimp')

const debug = require('util').debuglog('mosh')
const path = require('path')

const MoshError = require('./error')

module.exports = mosh

function mosh (options, cb) {
  debug('Moshing started.') // it's cool cuz it's nerdy.

  /* Only *.jpeg and *.jpeg are currently supported */
  if (!options || !options.read) {
    cb(new MoshError('Error: options.read is a required parameter'))
    return
  }

  const { read, write, mode } = options

  const filename = path.basename(read)
  if (
    !(
      filename.length < 256 &&
      (/^[\w\-. ]+.jpg$/.test(filename) ||
        /^[\w\-. ]+.jpeg$/.test(filename) ||
        /^[\w\-. ]+.png$/.test(filename) ||
        /^[\w\-. ]+.bmp$/.test(filename) ||
        /^[\w\-. ]+*.tiff$/.test(filename) ||
        /^[\w\-. ]+.gif$/.test(filename))
    )
  ) {
    cb(new MoshError('Only *.jpg OR *.jpeg file formats are supported.'))
    return
  }

  /* If mode is unset, randomly select one */
  const _mode =
    mode == null
      ? Object.keys(mosh.MODES)[
          Math.floor(Math.random() * Object.keys(mosh.MODES).length)
        ]
      : mode
  debug(`Mode selected: ${_mode}`)

  /* lean on jimp for img data */
  Jimp.read(read)
    .then(doMosh)
    .then(writeMosh)
    .catch(onError)

  function doMosh (original) {
    debug('Moshing')
    return mosh.MODES[_mode](original)
  }

  function writeMosh (moshed) {
    if (write) {
      debug('Mosh complete - writing out')
      moshed.write(write, cb)
    } else {
      debug('Mosh complete - calling back with img data')
      cb(null, moshed)
    }
  }

  function onError (error) {
    cb(new MoshError(error))
  }
}

mosh.MODES = {
  blurbobb: require('./modes/blurbobb'),
  schifty: require('./modes/schifty'),
  veneneux: require('./modes/veneneux'),
  vana: require('./modes/vana')
}
