'use strict';

import { stat, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';

function loadFromPath(path: any): Promise<Buffer> {
  path = replaceTilde(path);
  return stat(path).then(async () => readFile(path));
}

function writeToPath(path: string, data: Buffer) {
  if (data instanceof ArrayBuffer) data = Buffer.from(data);
  path = replaceTilde(path);
  return writeFile(path, data);
}

function replaceTilde(path: string) {
  if (path?.startsWith('~')) {
    return path.replace('~', homedir());
  }
  return path;
}

export { loadFromPath, writeToPath, replaceTilde };
