// @ts-check
"use strict"

export var REQUESTTYPE_PUT = "PUT";
export var REQUESTTYPE_GET = "GET";
export var REQUESTTYPE_VERSION = "VERSION";

export function createRequest(type, fileName = undefined, fileSize = undefined) {

    // WEBREPL_FILE = "<2sBBQLH64s"
    var request = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    request[0] = 'W'.charCodeAt(0);
    request[1] = 'A'.charCodeAt(0);

    switch(type) {
        case REQUESTTYPE_PUT: request[2] = 1; break;
        case REQUESTTYPE_GET: request[2] = 2; break;
        case REQUESTTYPE_VERSION: request[2] = 3; break;
    }

    if(type == REQUESTTYPE_VERSION)
        return request;

    request[3] = 0;
    request[4] = 0; request[5] = 0; request[6] = 0; request[7] = 0; request[8] = 0; request[9] = 0; request[10] = 0; request[11] = 0;

    if(type == REQUESTTYPE_PUT) {
        request[12] = fileSize & 0xff; request[13] = (fileSize >> 8) & 0xff; request[14] = (fileSize >> 16) & 0xff; request[15] = (fileSize >> 24) & 0xff;
    }
    else {
        request[12] = 0; request[13] = 0; request[14] = 0; request[15] = 0;
    }

    request[16] = fileName.length & 0xff; request[17] = (fileName.length >> 8) & 0xff;

    for (var i = 0; i < 64; ++i) {
        if (i < fileName.length) {
            request[18 + i] = fileName.charCodeAt(i);
        } else {
            request[18 + i] = 0;
        }
    }
    
    return request;
}