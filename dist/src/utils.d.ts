/// <reference types="node" />
declare function loadFromPath(path: any): Promise<Buffer>;
declare function writeToPath(path: string, data: Buffer): Promise<void>;
export { loadFromPath, writeToPath };
