'use strict'

import { isString, isArray, isFunction } from '../src/types'

/* I admit, this is a little redundant */

describe('type utilities', () => {
    describe('isString', () => {
        it('should return true when passed a string literal', () => {
            const actual = isString('Lyle Cooper')
            expect(actual).toBe(true)
        })
        it('should return true when passed a string variable', () => {
            const str = 'Joey Jordison'
            const actual = isString(str)
            expect(actual).toBe(true)
        })
        it('should return false when passed an array', () => {
            const notStr = ['Alex Rüdinger']
            const actual = isString(notStr)
            expect(actual).toBe(false)
        })
        it('should return false when passed an function', () => {
            const notStr = () => 'Mikael Åkerfeldt'
            const actual = isString(notStr)
            expect(actual).toBe(false)
        })
    })
    describe('isArray', () => {
        it('should return true when passed an array literal', () => {
            const actual = isArray(['Arian Asllani'])
            expect(actual).toBe(true)
        })
        it('should return true when passed an array variable', () => {
            const arr = ['Daniel Alan Maman']
            const actual = isArray(arr)
            expect(actual).toBe(true)
        })
        it('should return false when passed a string', () => {
            const notArr = 'Meyhem Lauren'
            const actual = isArray(notArr)
            expect(actual).toBe(false)
        })
        it('should return false when passed an function', () => {
            const notArr = () => 'Besnik E. Sadikaj'
            const actual = isArray(notArr)
            expect(actual).toBe(false)
        })
    })
    describe('isFunction', () => {
        it('should return true when passed an function literal', () => {
            const actual = isFunction(() => 'Datamosh')
            expect(actual).toBe(true)
        })
        it('should return true when passed an array variable', () => {
            const fn = () => 'Datamosh'
            const actual = isFunction(fn)
            expect(actual).toBe(true)
        })
        it('should return false when passed a string', () => {
            const notFn = 'Datamosh'
            const actual = isFunction(notFn)
            expect(actual).toBe(false)
        })
        it('should return false when passed an array', () => {
            const notFn = ['Datamosh']
            const actual = isFunction(notFn)
            expect(actual).toBe(false)
        })
    })
})