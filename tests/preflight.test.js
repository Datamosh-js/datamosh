'use strict'

const { join } = require('path')
const dm = require('../index')

const tryCatchWrap = async (...args) => {
    let res
    try {
        res = await dm(...args)
    } catch (e) {
        res = e
    }
    return res
}

describe('Preflight source checks should', () => {
    test('throw on invalid source type.', async () => {
        const obj = {}
        const arr = [1, 2, 3]

        let objErr = await tryCatchWrap(obj)

        expect(objErr.constructor).toBe(Error)
        expect(objErr.message).toBe(
            'Invalid image source -- source must be of type String (path) or Buffer.'
        )

        let arrErr = await tryCatchWrap(arr)

        expect(arrErr.constructor).toBe(Error)
        expect(arrErr.message).toBe(
            'Invalid image source -- source must be of type String (path) or Buffer.'
        )
    })

    test('throw on bad source buffer', async () => {
        const badImg = Buffer.from(['ff', '0f', '0f', 'ff'])

        let buffErr = await tryCatchWrap(badImg)

        expect(buffErr.constructor).toBe(Error)
        expect(buffErr.message).toBe(
            'Invalid file type, requires supported image file.'
        )
    })

    test('throw on unsupported file type.', async () => {
        const txt = join(__dirname, '/fixtures/a.txt')

        let txtErr = await tryCatchWrap(txt)

        expect(txtErr.constructor).toBe(Error)
        expect(txtErr.message).toBe('Invalid file type: txt')
    })

    test('throw on file not found', async () => {
        const path = '/does/not/exist.jpg'

        let enoent = await tryCatchWrap(path)

        expect(enoent.constructor).toBe(Error)
        expect(enoent.message).toBe(
            `Invalid source path: ${path}\nFile does not exist.`
        )
    })
})

describe('Preflight mode checks should', () => {
    test('throw on invalid mosh (as string)', async () => {
        const imgPath = join(__dirname, '/fixtures/rgb.png')
        const badMode = 'thisIsNotAModeName'

        let modeErr = await tryCatchWrap(imgPath, badMode)

        expect(modeErr.constructor).toBe(Error)
        expect(modeErr.message).toBe(`Invalid mosh mode: '${badMode}'`)
    })

    test('throw on invalid mosh (as array)', async () => {
        const imgPath = join(__dirname, '/fixtures/rgb.png')
        const badModes = ['thisIsNotAModeName', 'anotherBadOne']

        let modeErr = await tryCatchWrap(imgPath, badModes)

        expect(modeErr.constructor).toBe(Error)
        expect(modeErr.message).toBe(`Invalid mosh modes: '${badModes}'`)
    })

    test("choose a mode when one isn't provided", async () => {
        const imgPath = join(__dirname, '/fixtures/rgb.png')

        let imgBuff = await tryCatchWrap(imgPath)

        expect(imgBuff.constructor).toBe(Buffer)
    })
})

describe('Preflight write checks should', () => {
    test('throw on invalid write argument', async () => {
        const imgPath = join(__dirname, '/fixtures/rgb.png')
        const obj = {},
            arr = [1, 2, 3]

        let objErr = await tryCatchWrap(imgPath, null, obj)

        expect(objErr.constructor).toBe(Error)
        expect(objErr.message).toBe(`Invalid callback, or write path.`)

        let arrErr = await tryCatchWrap(imgPath, null, arr)

        expect(arrErr.constructor).toBe(Error)
        expect(arrErr.message).toBe(`Invalid callback, or write path.`)
    })

    test('throw on bad write path', async () => {
        const path = '/does/not/exist.jpg'

        let badWrite = await tryCatchWrap(path)

        expect(badWrite.constructor).toBe(Error)
        expect(badWrite.message).toBe(
            `Invalid source path: ${path}\nFile does not exist.`
        )
    })
})
