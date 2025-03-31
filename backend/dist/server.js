"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const base_1 = require("./constants/base");
const server = http_1.default.createServer(app_1.default);
server.listen(base_1.PORT, () => {
    console.log(`App listening on port: ${base_1.PORT}...`);
});
