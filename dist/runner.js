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
const _1 = __importDefault(require("."));
const fs_1 = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    _1.default.use({ 'joe': (d, w, h) => ({ data: d, width: Math.floor(w * 0.99999), height: Math.floor(h * 1.00001) }) });
    const p = (0, fs_1.readFileSync)('/home/m/Pictures/Screenshot from 2021-05-14 13-31-55.png');
    const d = yield _1.default.mosh(p, ['joe', 'joe', 'joe'], '~/Pictures/foo2.png');
    console.log(d);
}))();
