/* external */
import { fromBuffer } from 'file-type';
import encode from 'image-encode';
import decode from 'image-decode';

/* internal */
import supportExtensions from './exts.json';
import { isArray, isFunction, isString } from './types';
import { loadFromPath, writeToPath } from './utils';

class Datamosh {
  private modes = {};

  /* overloads */
  public async mosh(source: string, modes?: string): Promise<Buffer>;
  public async mosh(source: string, modes?: Array<string>): Promise<Buffer>;
  public async mosh(source: Buffer, modes?: string): Promise<Buffer>;
  public async mosh(source: Buffer, modes?: Array<string>): Promise<Buffer>;
  public async mosh(source: string, modes?: string, ret?: string): Promise<void>;
  public async mosh(source: string, modes?: string, ret?: Function): Promise<void>;
  public async mosh(source: string, modes?: Array<string>, ret?: string): Promise<void>;
  public async mosh(source: string, modes?: Array<string>, ret?: Function): Promise<void>;
  public async mosh(source: Buffer, modes?: string, ret?: string): Promise<void>;
  public async mosh(source: Buffer, modes?: string, ret?: Function): Promise<void>;
  public async mosh(source: Buffer, modes?: Array<string>, ret?: string): Promise<void>;
  public async mosh(source: Buffer, modes?: Array<string>, ret?: Function): Promise<void>;
  /* implementation */
  public async mosh(
    source: string | Buffer,
    modes?: string | Array<string>,
    ret?: string | Function
  ): Promise<void | Buffer> {
    console.log('mosh invoked');

    const _source: Buffer = isString(source)
      ? await loadFromPath(source)
      : (source as Buffer);

    const _ext = (await fromBuffer(_source)).ext;
    if (!supportExtensions.includes(_ext))
      throw new Error(`unsupported image format: ${_ext}`);

    // !!!!!!! consider [walter, null, vana]
    const _modes: Array<string> = isArray(modes)
      ? (modes as Array<string>).map((mode) => mode?.toLowerCase())
      : modes
      ? [(modes as string)?.toLowerCase()]
      : this.randomModes();

    const _ret: Function = isFunction(ret)
      ? ret
      : ret
      ? writeToPath.bind(this, `${ret}.${_ext}`)
      : ret;

    let { data: _data, width: _width, height: _height } = decode(_source);
    _modes.forEach((modeName) => {
      if (!this.modes[modeName]) throw new Error(`mode does not exist: ${modeName}`);
      const { data, width, height } = this.modes[modeName](_data, _width, _height);
      _data = data;
      _width = width ?? _width;
      _height = height ?? _height;
    });

    const encoded = encode(_data, [_width, _height], _ext);

    if (!_ret) return encoded;
    _ret(encoded);
  }

  public use(modes: Object): void {
    const badModes: Array<string> = [];
    Object.keys(modes).forEach((modeName) => {
      if (!this.modes[modeName]) this.modes[modeName] = modes[modeName];
      else badModes.push(modeName);
    });
    if (badModes.length > 0)
      throw new Error(`unable to use modes: ${badModes.join(', ')}`);
  }

  private randomModes(): Array<string> {
    const choices: number = Math.ceil(Math.random() * 5 + 10e-6);
    return Array(choices).map(() => {
      const names: Array<string> = Object.keys(this.modes);
      return names[Math.floor(Math.random() * names.length - 10e-6)];
    });
  }
}

export default new Datamosh();
