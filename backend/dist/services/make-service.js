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
const makeService = {
    getAllMakes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const makes = yield prisma_1.default.make.findMany();
                return makes;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createMake(newMakeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const make = yield prisma_1.default.make.create({
                    data: newMakeData,
                });
                return make;
            }
            catch (err) {
                if (err.code === "P2002") {
                    throw new http_error_1.default("Make already exists!", http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
                }
                else {
                    throw new http_error_1.default("Make could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            }
        });
    },
    deleteMake(makeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedMake = yield prisma_1.default.make.delete({
                    where: { id: makeId },
                });
                return deletedMake;
            }
            catch (err) {
                throw new http_error_1.default("Make could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
};
exports.default = makeService;
