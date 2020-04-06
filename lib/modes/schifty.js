'use strict'

module.exports = function (original) {
  const bitmapData = original.bitmap.data
  let data = Buffer.from(bitmapData)

  let size = Math.random() * 1024 * 4
  let total = size
  let temp = []
  const storage = []

  for (let i = 0; i < data.length; i++) {
    if (i < total) temp.push(data[i])
    else {
      storage.push(Buffer.from(temp))
      size = Math.random() * 1024 * 2
      total += size
      temp = []
    }
  }

  data = Buffer.concat(storage)
  original.bitmap.data = data

  return original
}
