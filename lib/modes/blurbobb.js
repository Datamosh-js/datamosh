'use strict'

module.exports = function (original) {
  const bitmapData = original.bitmap.data
  const data = Buffer.from(bitmapData)

  let counter = 0
  for (let i = 0; i < data.length; i++) {
    if (counter < 64) data[i] = Math.random() * 255

    counter++
    if (counter > 128) counter = Math.random() * 128
  }

  original.bitmap.data = data
  return original
}
