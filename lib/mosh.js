'use strict'

const Jimp = require('jimp')

const debug = require('util').debuglog('mosh')
const path = require('path')
const fs = require('fs')

module.exports = mosh

function mosh (options, cb) {
  debug('Moshing started.') // it's cool cuz it's nerdy.

  /* Buffer and support file-types are valid */
  if (!options || !options.read) {
    cb(new Error('Error: options.read is a required parameter'))
    return
  }

  const { read, write, mode } = options

  if (typeof read === 'string') {
    const filename = path.basename(read)
    if (
      !(
        filename.length < 256 &&
        (/^[\w\-. ]+.jpg$/.test(filename) ||
          /^[\w\-. ]+.jpeg$/.test(filename) ||
          /^[\w\-. ]+.png$/.test(filename) ||
          /^[\w\-. ]+.bmp$/.test(filename) ||
          /^[\w\-. ]+.tiff$/.test(filename) ||
          /^[\w\-. ]+.gif$/.test(filename))
      )
    ) {
      cb(
        new Error(
          'Only *.jpg, *.jpeg, *.png, *.bmp, *.tiff, and *.gif file formats are supported.'
        )
      )
      return
    }
  }

  mosh.MODES = {}

  const modeNames = fs.readdirSync(path.join(__dirname, '/modes'))

  modeNames.forEach((name) => {
    if (name.endsWith('.js')) {
      name = name.slice(0, name.indexOf('.'))
      mosh.MODES[name] = require(`./modes/${name}`)
    }
  })

  /* lean on jimp for img encoding */
  Jimp.read(read)
    .then(doMosh)
    .then(writeMosh)
    .catch(cb)

  function doMosh (original) {
    if (mode == null) {
      /* If mode is unset, randomly select one */
      const _mode =
        mode == null
          ? Object.keys(mosh.MODES)[
            Math.floor(Math.random() * Object.keys(mosh.MODES).length)
          ]
          : mode

      debug(`Selected mode: ${_mode}`)
      return mosh.MODES[_mode](original)
    } else if (Array.isArray(mode)) {
      /* If mode is array, apply each in order */
      let temp = original
      for (const _mode of mode) {
        temp = mosh.MODES[_mode](temp)
      }

      debug(`Using modes: ${mode.join(', ')}`)
      return temp
    } else {
      /* If mode is string, mosh once */
      debug(`Using mode: ${mode}`)
      return mosh.MODES[mode](original)
    }
  }

  function writeMosh (moshed) {
    if (write) {
      debug('Mosh complete - writing out')
      moshed.write(write, cb)
    } else {
      moshed.getBuffer(moshed._originalMime, (err, imgBuffer) => {
        if (err) {
          cb(new Error(err))
          return
        }
        debug('Mosh complete - calling back with img data')
        cb(null, imgBuffer)
      })
    }
  }
}
