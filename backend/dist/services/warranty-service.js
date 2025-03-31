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
const http_error_1 = __importDefault(require("../utils/http-error"));
const prisma_1 = __importDefault(require("../db/prisma"));
const warrantyService = {
    getAllWarranties() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const warranties = yield prisma_1.default.warranty.findMany();
                return warranties;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createWarranty(newWarrantyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const warranty = yield prisma_1.default.warranty.create({
                    data: newWarrantyData,
                });
                return warranty;
            }
            catch (err) {
                if (err.code === "P2002") {
                    throw new http_error_1.default("Warranty term already exists!", http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
                }
                else {
                    throw new http_error_1.default("Warranty term could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            }
        });
    },
    deleteWarranty(warrantyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedWarranty = yield prisma_1.default.warranty.delete({
                    where: { id: warrantyId },
                });
                return deletedWarranty;
            }
            catch (err) {
                throw new http_error_1.default("Warranty term could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
};
exports.default = warrantyService;
