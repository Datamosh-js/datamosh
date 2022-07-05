const limiter = (x, min) => (x < min ? min : x)
const getClosestRoot = x => x - (x % 4)
const maxOffset = x => {
  let m = x[0]
  let o = 0
  for (let i = 1; i < x.length; i++) {
    if (x[i] > m) {
      o = i
      m = x[i]
    }
  }
  return [o, m]
}

module.exports = function (data, width) {
  const sqLen = Math.sqrt(data.length) / 8
  const ret = []
  let i = 0

  while (i < data.length) {
    const size = limiter(Math.random() * (width / 40), 1)
    let [offset, max] = maxOffset([data[i], data[i + 1], data[i + 2]])
    const skip = getClosestRoot(Math.random() * sqLen)

    for (let j = 0; j < size; j++) {
      for (let k = 0; k < 3; k++) {
        if (offset === k) {
          ret.push(data[i + k])
        } else {
          ret.push(0)
        }
      }
      ret.push(255)
      i += 4
    }

    for (let j = 0; j < skip; j++) {
      ret.push(0)
    }
    i += skip
  }

  const yAxisesCount = (Math.sqrt(data.length) * 4) | 0
  for (let i = 0; i < yAxisesCount; i++) {
    const swapFrom = getClosestRoot(Math.random() * data.length)

    for (let j = 0; j < 3; j++) {
      if (swapFrom < data.length - width * 64) {
        for (let k = 0; k < 20; k++) {
          const swapPath = swapFrom + j + width * 4 * (k - 4)
          if (swapPath > 0)
            ret[swapFrom + j + width * 4 * (k - 4)] = ret[swapFrom + j]
        }
      }
    }
  }

  return ret
}
