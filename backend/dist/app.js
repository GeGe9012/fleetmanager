"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_routes_1 = __importDefault(require("./routes/api-routes"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", api_routes_1.default);
app.use(error_handler_1.default);
exports.default = app;
