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
const customer_service_1 = __importDefault(require("../services/customer-service"));
const http_status_codes_1 = require("../constants/http-status-codes");
const customerController = {
    getAllCustomers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield customer_service_1.default.getAllCustomers(req.query);
                res.json(customers);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCustomer = yield customer_service_1.default.createCustomer(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newCustomer);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId } = req.params;
                const deletedCustomer = yield customer_service_1.default.deleteCustomer(customerId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedCustomer);
            }
            catch (err) {
                next(err);
            }
        });
    },
    updateCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCustomer = yield customer_service_1.default.updateCustomer(req.params.customerId, req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.ACCEPTED).json(updatedCustomer);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = customerController;
