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
const make_service_1 = __importDefault(require("../services/make-service"));
const makeController = {
    getAllMakes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const makes = yield make_service_1.default.getAllMakes();
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(makes);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createMake(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMake = yield make_service_1.default.createMake(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newMake);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteMake(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { makeId } = req.params;
                const deletedMake = yield make_service_1.default.deleteMake(makeId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedMake);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = makeController;
