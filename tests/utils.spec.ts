'use strict'

import { stat } from 'fs/promises'

import { loadFromPath, writeToPath, replaceTilde } from '../src/utils'

describe('fs utils', () => {
    describe('loadFromPath', () => {
        it('should load a file from it\'s path', async ()=> {
            const path = 'tests/fixtures/rgb.png'
            const actual = await loadFromPath(path)
            expect(actual).toBeDefined()
        })
        it('should throw error when the path is invalid', async ()=> {
            expect.assertions(2)
            const path = 'tests/fixtures/dne.png'
            try {
                await loadFromPath(path)
            } catch (e) {
                expect(e).toBeDefined()
                expect(e.code).toBe('ENOENT')
            }
        })
        it('should throw error when the path is undefined', async ()=> {
            expect.assertions(2)
            const path = undefined
            try {
                await loadFromPath(path)
            } catch (e) {
                expect(e).toBeDefined()
                expect(e.code).toBe('ERR_INVALID_ARG_TYPE')
            }
        })
    })
    describe('writeToPath', () => {
        it('should write a file to a path', async () => {
            const data = Buffer.from([0,1,2,3])
            const path = 'tests/fixtures/deleteme.png'
            await writeToPath(path, data)
            const actual = await stat(path)
            expect(actual.size).toBe(4)
        })
        it('should throw error when the path is undefined', async ()=> {
            expect.assertions(2)
            const data = Buffer.from([0,1,2,3])
            const path = undefined
            try {
                await writeToPath(path, data)
            } catch (e) {
                expect(e).toBeDefined()
                expect(e.code).toBe('ERR_INVALID_ARG_TYPE')
            }
        })
        it('should throw error when the path is invalid', async ()=> {
            const data = Buffer.from([0,1,2,3])
            const path = 'tests/infiniteCorridor/dne.png'
            try {
                await writeToPath(path, data)
            } catch (e) {
                expect(e).toBeDefined()
                expect(e.code).toBe('ENOENT')
            }
        })
    })
    describe('replaceTilde', () => {
        const homedirSpy = jest.spyOn(require('os'), 'homedir')
        it('should return original path if it does not contain a tilde', () => {
            const path = '/let/it/rain/on/me.png'
            const actual = replaceTilde(path)
            expect(actual).toEqual(path)
        })
        it('should replace tilde with homedir', async () => {
            homedirSpy.mockReturnValue('just/move/on')
            const path = '~/up.gif'
            const actual = replaceTilde(path)
            expect(actual).toEqual('just/move/on/up.gif')
        })
    })
})