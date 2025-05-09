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
const warranty_service_1 = __importDefault(require("../services/warranty-service"));
const warrantyController = {
    getAllWarranties(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const warranties = yield warranty_service_1.default.getAllWarranties();
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(warranties);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createWarranty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newWarranty = yield warranty_service_1.default.createWarranty(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newWarranty);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteWarranty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { warrantyId } = req.params;
                const deletedWarranty = yield warranty_service_1.default.deleteWarranty(warrantyId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedWarranty);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = warrantyController;
