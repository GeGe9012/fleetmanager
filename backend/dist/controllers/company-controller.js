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
const company_service_1 = __importDefault(require("../services/company-service"));
const companyController = {
    getAllCompanies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield company_service_1.default.getAllCompanies(req.query);
                res.json(companies);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCompany = yield company_service_1.default.createCompany(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newCompany);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                const deletedCompany = yield company_service_1.default.deleteCompany(companyId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedCompany);
            }
            catch (err) {
                next(err);
            }
        });
    },
    updateCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCompany = yield company_service_1.default.updateCompany(req.params.companyId, req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.ACCEPTED).json(updatedCompany);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = companyController;
