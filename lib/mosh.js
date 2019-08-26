'use strict'

const debug = require('debug')('mosh')

const path = require('path')
const { promisify } = require('util')
const { writeFile: write, readFile: read } = require('fs')

const writeFile = promisify(write)
const readFile = promisify(read)

const { throwMoshError } = require('./util')

module.exports = mosh

const MODES = {
  blurbobb: require('./modes/blurbobb'),
  schifty: require('./modes/schifty')
}

async function mosh (readFrom, writeOut, config) {
  debug('Moshing started.') // it's cool cuz it's nerdy.

  /* Only *.jpeg and *.jpeg are currently supported */
  const filename = path.basename(readFrom)
  if (!(/^[a-zA-Z0-9]*.jpg$/.test(filename) || /^[a-zA-Z0-9]*.jpeg$/.test(filename))) {
    return throwMoshError('Only *.jpg OR *.jpeg file formats are supported.')
  }

  if (config == null) config = {}

  /* Read original file */
  let original
  try {
    original = await readFile(readFrom)
  } catch (error) {
    return throwMoshError(error)
  }
  debug(`Read successful: ${readFrom}`)

  /* If mode is unset, randomly select one */
  const mode = config.mode == null
    ? Object.keys(MODES)[Math.floor(Math.random() * Object.keys(MODES).length)]
    : config.mode
  debug(`Mode selected: ${mode}`)

  /* Mosh image depending on mode */
  let post
  try {
    post = MODES[mode](original)
  } catch (error) {
    return throwMoshError(`Unsupported mosh mode. Supported modes: ${Object.keys(MODES).join(', ')}`)
  }
  debug('Mosh complete')

  /* Return raw data if `writeOut` location is unspecified */
  if (writeOut == null) {
    debug('`writeOut` is null. Returning raw image data.')
    return post
  }

  /* Write image */
  try {
    writeFile(writeOut, post)
  } catch (error) {
    return throwMoshError(error)
  }
  debug(`Write successful: Image written to: ${writeOut}`)
}
