"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(msg, statusCode = 500) {
        super(msg);
        this.statusCode = statusCode;
    }
}
exports.default = HttpError;
