// @ts-check
"use strict"

export var SERVICE_MESSAGE_EVENT = 'SERVICE_MESSAGE_EVENT';
export var FILE_PUT_EVENT = 'FILE_PUT_EVENT';
export var FILE_GET_EVENT = 'FILE_GET_EVENT';

export var REPL_READY_EVENT = 'REPL_READY_EVENT';

export var FILETYPE_FOLDER = 0x4000;
export var FILETYPE_FILE = 0x8000;

var NOOP = () => {};
export var INVALID_CALLBACK = () => { throw new Error("Not defined") };

export function cleanCallback(cb) {
    return cb || NOOP;
}