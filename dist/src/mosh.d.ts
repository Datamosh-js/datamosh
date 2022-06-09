/// <reference types="node" />
declare class Datamosh {
    private modes;
    mosh(source: string, modes?: string): Promise<Buffer>;
    mosh(source: string, modes?: Array<string>): Promise<Buffer>;
    mosh(source: Buffer, modes?: string): Promise<Buffer>;
    mosh(source: Buffer, modes?: Array<string>): Promise<Buffer>;
    mosh(source: string, modes?: string, ret?: string): Promise<void>;
    mosh(source: string, modes?: string, ret?: Function): Promise<void>;
    mosh(source: string, modes?: Array<string>, ret?: string): Promise<void>;
    mosh(source: string, modes?: Array<string>, ret?: Function): Promise<void>;
    mosh(source: Buffer, modes?: string, ret?: string): Promise<void>;
    mosh(source: Buffer, modes?: string, ret?: Function): Promise<void>;
    mosh(source: Buffer, modes?: Array<string>, ret?: string): Promise<void>;
    mosh(source: Buffer, modes?: Array<string>, ret?: Function): Promise<void>;
    use(modes: Object): void;
    private randomModes;
}
declare const _default: Datamosh;
export default _default;
