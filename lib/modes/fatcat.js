'use strict'

module.exports = function (original) {
  const min = Math.min

  const bitmapData = original.bitmap.data
  const data = Buffer.from(bitmapData)

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = min(data[i + 0] * 1.4, 280)
    data[i + 1] = min(data[i + 1] * 1.4, 280)
    data[i + 2] = min(data[i + 2] * 1.4, 280)
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = min(data[i + 0] * 1.4, 280)
    data[i + 1] = min(data[i + 1] * 1.4, 280)
    data[i + 2] = min(data[i + 2] * 1.4, 280)
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = min(data[i + 0] * 1.4, 256)
    data[i + 1] = min(data[i + 1] * 1.4, 256)
    data[i + 2] = min(data[i + 2] * 1.4, 256)
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = min(data[i + 0] * 1.4, 255)
    data[i + 1] = min(data[i + 1] * 1.4, 255)
    data[i + 2] = min(data[i + 2] * 1.4, 255)
  }

  original.bitmap.data = data
  return original
}
