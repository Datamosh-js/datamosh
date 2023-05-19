'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
/* core */
const promises_1 = require('fs/promises')
/* mocks */
const image_decode_1 = __importDefault(require('image-decode'))
const file_type_1 = __importDefault(require('file-type'))
jest.mock('image-decode')
jest.mock('file-type')
/* in-testing */
const datamosh_1 = __importDefault(require('../lib/datamosh'))
const IMAGE_FIXTURE_PATHS = {
    rgb: 'tests/fixtures/rgb.png',
}
describe('datamosh', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should not throw when src argument is of type Buffer', () => {
        expect.assertions(1)
        const src = Buffer.alloc(64, 1)
        const args = { src }
        expect(() =>
            __awaiter(void 0, void 0, void 0, function* () {
                yield (0, datamosh_1.default)(args)
            })
        ).not.toThrow()
    })
    it('should not throw when mode argument is of type String', () => {
        expect.assertions(1)
        const src = Buffer.alloc(64, 1)
        const mode = 'foobar'
        const args = { src, mode }
        expect(() =>
            __awaiter(void 0, void 0, void 0, function* () {
                yield (0, datamosh_1.default)(args)
            })
        ).not.toThrow()
    })
    it.only('should get the file-type from the src Buffer', () =>
        __awaiter(void 0, void 0, void 0, function* () {
            expect.assertions(2)
            const src = yield (0, promises_1.readFile)(IMAGE_FIXTURE_PATHS.rgb)
            const args = { src }
            yield (0, datamosh_1.default)(args)
            expect(src.length).not.toBe(0)
            expect(file_type_1.default.fromBuffer).toHaveBeenCalledWith(src)
        }))
    it('should decode the src Buffer', () =>
        __awaiter(void 0, void 0, void 0, function* () {
            expect.assertions(1)
            const src = Buffer.alloc(64, 1)
            const mode = 'foobar'
            const args = { src, mode }
            yield (0, datamosh_1.default)(args)
            expect(image_decode_1.default).toHaveBeenCalledWith(src)
        }))
})
