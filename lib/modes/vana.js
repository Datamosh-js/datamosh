'use strict'

module.exports = function (original) {
  const rand = Math.random
  const max = Math.max
  const min = Math.min

  const bitmapData = original.bitmap.data
  const data = Buffer.from(bitmapData)

  function giveSeed () {
    const seed = [0, 0, 0]

    const ind1 = Math.floor(rand() * 3)
    const ind2 = Math.floor(rand() * 3)

    seed[ind1] = max(rand(), 0.3)
    if (rand() > 0.5) seed[ind2] = max(rand(), 0.3)

    return seed
  }

  const seed = giveSeed()

  for (let i = 0; i < data.length; i += 4) {
    /* RED = */
    data[i + 0] = min(data[i] * seed[0] + 100 * seed[2], 255)
    /* GREEN = */
    data[i + 1] = min(data[i + 1] * seed[1] + 100 * seed[0], 255)
    /* BLUE = */
    data[i + 2] = min(data[i + 2] * seed[2] + 100 * seed[1], 255)
  }

  original.bitmap.data = data
  return original
}
