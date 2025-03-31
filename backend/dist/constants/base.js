"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DATABASE_URL = void 0;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT || 1000;
