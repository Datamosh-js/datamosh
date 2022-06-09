"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* external */
const file_type_1 = require("file-type");
const image_encode_1 = __importDefault(require("image-encode"));
const image_decode_1 = __importDefault(require("image-decode"));
/* internal */
const exts_json_1 = __importDefault(require("./exts.json"));
const types_1 = require("./types");
const utils_1 = require("./utils");
class Datamosh {
    constructor() {
        this.modes = {};
    }
    /* implementation */
    mosh(source, modes, ret) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('mosh invoked');
            const _source = (0, types_1.isString)(source)
                ? yield (0, utils_1.loadFromPath)(source)
                : source;
            const _ext = (yield (0, file_type_1.fromBuffer)(_source)).ext;
            if (!exts_json_1.default.includes(_ext))
                throw new Error(`unsupported image format: ${_ext}`);
            // !!!!!!! consider [walter, null, vana]
            const _modes = (0, types_1.isArray)(modes)
                ? modes.map((mode) => mode === null || mode === void 0 ? void 0 : mode.toLowerCase())
                : modes
                    ? [modes === null || modes === void 0 ? void 0 : modes.toLowerCase()]
                    : this.randomModes();
            const _ret = (0, types_1.isFunction)(ret)
                ? ret
                : ret
                    ? utils_1.writeToPath.bind(this, `${ret}.${_ext}`)
                    : ret;
            let { data: _data, width: _width, height: _height } = (0, image_decode_1.default)(_source);
            _modes.forEach((modeName) => {
                if (!this.modes[modeName])
                    throw new Error(`mode does not exist: ${modeName}`);
                const { data, width, height } = this.modes[modeName](_data, _width, _height);
                _data = data;
                _width = width !== null && width !== void 0 ? width : _width;
                _height = height !== null && height !== void 0 ? height : _height;
            });
            const encoded = (0, image_encode_1.default)(_data, [_width, _height], _ext);
            if (!_ret)
                return encoded;
            _ret(encoded);
        });
    }
    use(modes) {
        const badModes = [];
        Object.keys(modes).forEach((modeName) => {
            if (!this.modes[modeName])
                this.modes[modeName] = modes[modeName];
            else
                badModes.push(modeName);
        });
        if (badModes.length > 0)
            throw new Error(`unable to use modes: ${badModes.join(', ')}`);
    }
    randomModes() {
        const choices = Math.ceil(Math.random() * 5 + 10e-6);
        return Array(choices).map(() => {
            const names = Object.keys(this.modes);
            return names[Math.floor(Math.random() * names.length - 10e-6)];
        });
    }
}
exports.default = new Datamosh();
