'use strict'

const jpeg = require('jpeg-js')
const debug = require('debug')('mode:blurbobb')

module.exports = function (original) {
  const decoded = jpeg.decode(original)
  const data = Buffer.from(decoded.data)

  let counter = 0
  for (let i = 0; i < decoded.data.length; i++) {
    if (counter < 64) data[i] = Math.random() * 255

    counter++
    if (counter > 128) counter = Math.random() * 128
  }

  const jpegEncode = jpeg.encode({
    data: data,
    width: decoded.width,
    height: decoded.height
  })
  debug('Encoding successful.')

  return Buffer.from(jpegEncode.data)
}
