'use strict'

const jpeg = require('jpeg-js')
const debug = require('debug')('mode:schifty')

module.exports = function (original) {
  const decoded = jpeg.decode(original)
  let data = Buffer.from(decoded.data)

  let size = Math.random() * 1024 * 4
  let total = size
  let temp = []
  const storage = []

  for (let i = 0; i < decoded.data.length; i++) {
    if (i < total) temp.push(data[i])
    else {
      storage.push(Buffer.from(temp))
      size = Math.random() * 1024 * 2
      total += size
      temp = []
    }
  }

  data = Buffer.concat(storage)

  const jpegEncode = jpeg.encode({
    data: data,
    width: decoded.width,
    height: decoded.height
  })
  debug('Encoding successful.')

  return Buffer.from(jpegEncode.data)
}
