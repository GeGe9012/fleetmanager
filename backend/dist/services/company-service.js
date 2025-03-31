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
const companyService = {
    getAllCompanies() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const whereClause = {};
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) {
                        if (value.includes("%")) {
                            whereClause[key] = {
                                contains: value.replace(/%/g, ""),
                                mode: "insensitive",
                            };
                        }
                        else {
                            whereClause[key] = { startsWith: value, mode: "insensitive" };
                        }
                    }
                });
                const companies = yield prisma_1.default.company.findMany({ where: whereClause });
                return companies;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createCompany(NewCompanyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield prisma_1.default.company.create({
                    data: NewCompanyData,
                });
                return company;
            }
            catch (err) {
                throw new http_error_1.default("Company could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    deleteCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCompany = yield prisma_1.default.company.delete({
                    where: { id: companyId },
                });
                return deletedCompany;
            }
            catch (err) {
                throw new http_error_1.default("Company could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    updateCompany(companyId, newCompanyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCompany = yield prisma_1.default.company.update({
                    where: { id: companyId },
                    data: newCompanyData,
                });
                return updatedCompany;
            }
            catch (err) {
                throw new http_error_1.default("Company does not exist", http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
            }
        });
    },
};
exports.default = companyService;
