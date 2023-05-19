'use strict'

module.exports = function (data) {
    const ret = []

    for (let i = 0; i < data.length; i += 4) {
        if (i % 12 === 0) {
            ret.push(data[i])
            ret.push(data[i + 1])
            ret.push(data[i + 2])
            ret.push(255)
        } else {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            const max = Math.max(r, g, b)
            const min = Math.min(r, g, b)
            const L = (r + g + b) / 765

            let value = L > 0.65 ? 255 : L < 0.35 ? 0 : null

            for (let j = 0; j < 3; j++) {
                if (!value) ret.push(Math.random() > 0.5 ? max : min)
                else ret.push(value)
            }
            ret.push(255)
        }
    }

    return ret
}
