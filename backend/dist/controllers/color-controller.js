"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("../constants/http-status-codes");
const color_service_1 = __importDefault(require("../services/color-service"));
const colorController = {
    getAllColors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colors = yield color_service_1.default.getAllColors();
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(colors);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createColor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newColor = yield color_service_1.default.createColor(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newColor);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteColor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { colorId } = req.params;
                const deletedColor = yield color_service_1.default.deleteColor(colorId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedColor);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = colorController;
