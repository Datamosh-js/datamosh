'use strict'

import * as encode from 'image-encode'
import * as decode from 'image-decode'
import { fromBuffer } from 'file-type'

import supportedModes from './modes'

type MoshArguments = {
    src: Buffer
    mode?: string
    modes?: Array<string>
}

async function datamosh({ src, mode = 'random', modes }: MoshArguments) {
    // validate file-type
    const fileTypeMeta: any = await fromBuffer(src)
    if (
        !fileTypeMeta ||
        !['jpg', 'jpeg', 'png', 'gif', 'tif', 'bmp'].includes(fileTypeMeta?.ext)
    )
        throwError('Invalid source buffer.')

    // decode image
    const decodedSourceImg: any = decode(src)

    // apply mode(s)
    let moshedImg = Buffer.from(decodedSourceImg.data)
    if (mode && supportedModes[mode])
        moshedImg = supportedModes[mode](moshedImg)
    if (
        modes &&
        modes.filter((m) => supportedModes.includes(m)).length === modes.length
    ) {
        modes.forEach(
            (mode) => moshedImg = supportedModes[mode](moshedImg)
        )
    }

    // encode image
    const encodedMoshedImg = encode(
        moshedImg,
        [decodedSourceImg.width, decodedSourceImg.height],
        fileTypeMeta.ext
    )
    return encodedMoshedImg
}

function throwError(msg: string) {
    const error: Error = new Error(msg)
    throw error
}

export default datamosh
