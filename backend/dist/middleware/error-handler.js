"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Something failed!",
        statusCode,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}
