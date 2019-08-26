'use strict'

module.exports = {
    throwMoshError
}

function throwMoshError (error) {
    process.exitCode = 1
    return new MoshError(error)
}

class MoshError extends Error {
    constructor (args) {
        super(args)
        this.name = "MoshError"
    }
}