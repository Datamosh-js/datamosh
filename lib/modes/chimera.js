'use strict'

/** Configurable variables */
const noiseThreshold = 0.2
const grainThreshold = 0.4
const chimeraWeight = [0.25, 0.5]

/** Math references */
const min = Math.min,
    max = Math.max,
    floor = Math.floor,
    random = Math.random

/** Randomizer */
function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/** Chimera effect */
function chimera(data, width, height, weight = [0.25, 0.5]) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x) * 4

            let r = data[index],
                g = data[index + 1],
                b = data[index + 2]

            /** Apply different weights to each color channel */
            data[index] = r + g * weight[1] + b * weight[0]
            data[index + 1] = r * weight[1] + g + b * weight[0]
            data[index + 2] = r * weight[0] + g * weight[1] + b
        }
    }

    return data
}

/** Blurs a buffer */
function blur(data, width, height, blurDirection, intensity = 5) {
    /** Create copy of buffer */
    const buffer = Buffer.alloc(data.length)
    data.copy(buffer)

    /** Iterate through the image, averaging pixels in the specified direction */
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x) * 4

            let sumR = 0,
                sumG = 0,
                sumB = 0,
                count = 0

            for (let i = 1; i <= intensity; i++) {
                if (blurDirection === 'horizontal') {
                    if (x + i < width) {
                        let nextIndex = (y * width + x + i) * 4

                        sumR += data[nextIndex]
                        sumG += data[nextIndex + 1]
                        sumB += data[nextIndex + 2]

                        count++
                    }
                } else if (blurDirection === 'vertical') {
                    if (y + i < height) {
                        let nextIndex = ((y + i) * width + x) * 4
                        sumR += data[nextIndex]
                        sumG += data[nextIndex + 1]
                        sumB += data[nextIndex + 2]
                        count++
                    }
                }
            }

            buffer[index] = sumR / count
            buffer[index + 1] = sumG / count
            buffer[index + 2] = sumB / count
        }
    }

    return buffer
}

/** Creates a "glitch" effect with randomly displaced rectangles */
function displaceRectangles(data, width, height) {
    /** Iterate through the image, selecting random rectangles */
    for (let i = 0; i < 100; i++) {
        /** Choose rectangle dimensions */
        const rectWidth = floor(random() * (width / 15))
        const rectHeight = floor(random() * (height / 30))

        /** Choose rectangle positions */
        const rectX = floor(random() * (width - rectWidth))
        const rectY = floor(random() * (height - rectHeight))

        /** Displace the pixels within the rectangle */
        let shift = floor(random() * (rectWidth / 4))
        let shiftX = random() >= 0.5

        const rMode = random()

        /** Rectangle modifier */
        const mode = rMode >= 0.66 ? r(5, 20) : rMode >= 0.33 ? null : -255

        for (let y = rectY; y < rectY + rectHeight; y++) {
            for (let x = rectX; x < rectX + rectWidth; x++) {
                let pixelIndex = (y * width + x) * 4

                /** Displace the pixel's index randomly */
                let assignedIndex_X = (y * width + x + (shiftX ? shift : 0)) * 4
                let assignedIndex_Y =
                    ((y + (shiftX ? 0 : shift)) * width + x) * 4

                for (let j = 0; j < 4; j++) {
                    let temp = data[pixelIndex + j]

                    data[pixelIndex + j] = min(
                        255,
                        data[assignedIndex_X + j] + (!mode ? -r(0, 20) : mode)
                    )

                    data[assignedIndex_X + j] = min(
                        255,
                        data[assignedIndex_Y + j] + (!mode ? -r(0, 20) : mode)
                    )

                    data[assignedIndex_Y + j] = min(
                        255,
                        temp + (!mode ? -r(0, 20) : mode)
                    )
                }
            }
        }
    }

    return data
}

module.exports = function (data, width, height) {
    /** Choose blur direction and intensity */
    const blurDirection = random() >= 0.5 ? 'horizontal' : 'vertical'
    const blurIntensity = r(5, 10)

    /** Displace rectangles */
    data = displaceRectangles(data, width, height)

    /** Blur image */
    data = blur(data, width, height, blurDirection, blurIntensity)

    /** Apply `chimera` effect */
    data = chimera(data, width, height, chimeraWeight)

    for (let index = 0; index < data.length; index += 4) {
        const useNoise = random() < noiseThreshold
        const useGrain = random() < grainThreshold ? floor(random() * 50) : 0

        ;[0, 1, 2].forEach((i) => {
            /** Add noise */
            data[index + i] = useNoise
                ? min(data[index + i] + r(1, i === 0 ? 15 : 10), 255)
                : data[index + i]

            /** Darken image */
            data[index + i] = min(
                255,
                max(0, data[index + i] + (floor(random() * 20) - 30))
            )

            /** Add grain */
            data[index + i] = useGrain
                ? min(255, max(0, data[index + i] + useGrain))
                : data[index + i]
        })
    }

    return data
}
