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
const contract_service_1 = __importDefault(require("../services/contract-service"));
const contractController = {
    getAllContracts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield contract_service_1.default.getAllContracts(req.query);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(contracts);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createContract(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContract = yield contract_service_1.default.createContract(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newContract);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteContract(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contractId } = req.params;
                const deletedContract = yield contract_service_1.default.deleteContract(contractId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedContract);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = contractController;
