const normalizeAlpha = x => x - (x % 4) + 3
const randInt = (min, max) => (min + Math.random() * (max - min)) | 0
const abna = (a, b) => (a << b) | (b << a)

module.exports = function (data) {
  const ret = []
  const sqLen = (Math.sqrt(data.length) * (5 + Math.random() * 15)) | 0
  const firstInflexion = normalizeAlpha(randInt(sqLen, data.length / 10))

  for (let i = 0; i < data.length - 1; i++) {
    const offset = i % 4
    if (i === firstInflexion) ret.reverse()

    if (i % sqLen === 0) i += 4
    if (offset === 3) ret.push(data[i])
    else ret.push(abna(data[i], offset === 2 ? data[i + 2] : data[i + 1]))
  }

  return ret
}