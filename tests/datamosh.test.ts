"use strict"

/* core */
import { readFile } from 'fs/promises'

/* mocks */
import decode from 'image-decode'
import filetype from 'file-type'
jest.mock('image-decode')
jest.mock('file-type')

/* in-testing */
import datamosh from '../lib/datamosh'

const IMAGE_FIXTURE_PATHS = {
    rgb: 'tests/fixtures/rgb.png'
}

describe('datamosh', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should not throw when src argument is of type Buffer', () => {
        expect.assertions(1)

        const src: Buffer = Buffer.alloc(64, 1)
        const args: any = { src }

        expect(async () => {
            await datamosh(args)
        }).not.toThrow()
    })

    it('should not throw when mode argument is of type String', () => {
        expect.assertions(1)

        const src: Buffer = Buffer.alloc(64, 1)
        const mode: String = "foobar"
        const args: any = { src, mode }

        expect(async () => {
            await datamosh(args)
        }).not.toThrow()
    })

    it.only('should get the file-type from the src Buffer', async () => {
        expect.assertions(2)

        const src: Buffer = await readFile(IMAGE_FIXTURE_PATHS.rgb)
        const args: any = { src }

        await datamosh(args)

        expect(src.length).not.toBe(0)
        expect(filetype.fromBuffer).toHaveBeenCalledWith(src)
    })

    it('should decode the src Buffer', async () => {
        expect.assertions(1)

        const src: Buffer = Buffer.alloc(64, 1)
        const mode: String = "foobar"
        const args: any = { src, mode }

        await datamosh(args)

        expect(decode).toHaveBeenCalledWith(src)
    })
})