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
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToPath = exports.loadFromPath = void 0;
const promises_1 = require("fs/promises");
const os_1 = require("os");
function loadFromPath(path) {
    path = replaceTilde(path);
    return (0, promises_1.stat)(path).then(() => __awaiter(this, void 0, void 0, function* () { return (0, promises_1.readFile)(path); }));
}
exports.loadFromPath = loadFromPath;
function writeToPath(path, data) {
    if (data instanceof ArrayBuffer)
        data = Buffer.from(data);
    path = replaceTilde(path);
    return (0, promises_1.writeFile)(path, data);
}
exports.writeToPath = writeToPath;
function replaceTilde(path) {
    if (path.startsWith('~')) {
        return path.replace('~', (0, os_1.homedir)());
    }
    return path;
}
