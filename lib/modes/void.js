'use strict'

/** Configurable variables */
const noiseThreshold = 0.2
const grainThreshold = 0.4

/** Math references */
const min = Math.min,
    max = Math.max,
    floor = Math.floor,
    random = Math.random

/** Randomizer */
function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = function (data) {
    for (let index = 0; index < data.length; index += 4) {
        const useNoise = random() < noiseThreshold
        const useGrain = random() < grainThreshold ? floor(random() * 50) : 0

        ;[0, 1, 2].forEach((i) => {
            /** Void effect */
            data[index + i] = data[index + i] - r(1, 15)
            data[index + i] =
                data[index + i] < 0 ? data[index + i] + 255 : data[index + i]

            /** Add noise */
            data[index + i] = useNoise
                ? min(data[index + i] + r(1, i === 0 ? 15 : 10), 255)
                : data[index + i]

            /** Darken image */
            data[index + i] = min(
                255,
                max(0, data[index + i] + floor(random() * 20 - 40))
            )

            /** Add grain */
            data[index + i] = useGrain
                ? min(255, max(0, data[index + i] + useGrain))
                : data[index + i]
        })
    }

    return data
}
