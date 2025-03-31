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
const contractService = {
    getAllContracts() {
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
                const contracts = yield prisma_1.default.contract.findMany({ where: whereClause });
                return contracts;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createContract(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractNumber = yield generateContractNumber();
                const newContract = yield prisma_1.default.contract.create({
                    data: {
                        contract_number: contractNumber,
                        license_plate: data.license_plate,
                        customer_name: data.customer_name,
                        company_name: data.company_name,
                        contract_exp: data.contract_exp,
                        car: { connect: { id: data.car_id } },
                        customer: { connect: { id: data.customer_id } },
                        company: { connect: { id: data.company_id } },
                    },
                });
                const updatedCar = yield prisma_1.default.car.update({
                    where: { id: data.car_id },
                    data: { contract_id: newContract.id },
                });
                const updatedCustomer = yield prisma_1.default.customer.update({
                    where: { id: data.customer_id },
                    data: {
                        contracts: {
                            connect: { id: newContract.id },
                        },
                    },
                });
                const updatedCompany = yield prisma_1.default.company.update({
                    where: { id: data.company_id },
                    data: {
                        contracts: {
                            connect: { id: newContract.id },
                        },
                    },
                });
                return {
                    contract: newContract,
                    car: updatedCar,
                    customer: updatedCustomer,
                    company: updatedCompany,
                };
            }
            catch (err) {
                if (err.code === "P2014") {
                    throw new http_error_1.default("The car already has an active contract!", http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
                }
                else {
                    throw new http_error_1.default("Contract could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            }
        });
    },
    deleteContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.car.updateMany({
                    where: { contract_id: contractId },
                    data: { contract_id: null },
                });
                const deletedContract = yield prisma_1.default.contract.delete({
                    where: { id: contractId },
                });
                return deletedContract;
            }
            catch (err) {
                console.error(err);
                throw new http_error_1.default("Contract could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
};
function generateContractNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentYear = new Date().getFullYear();
        const prefix = `${currentYear}TFM`;
        const lastContract = yield prisma_1.default.contract.findFirst({
            where: { contract_number: { startsWith: prefix } },
            orderBy: { contract_number: "desc" },
        });
        let newNumber = 1;
        if (lastContract) {
            const lastNumber = parseInt(lastContract.contract_number.slice(-3), 10);
            newNumber = lastNumber + 1;
        }
        const newContractNumber = `${prefix}${String(newNumber).padStart(3, "0")}`;
        return newContractNumber;
    });
}
exports.default = contractService;
