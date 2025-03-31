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
const customerService = {
    getAllCustomers() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const whereClause = { OR: [] };
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) {
                        const filterValue = value.includes("%")
                            ? {
                                contains: value.replace(/%/g, ""),
                                mode: "insensitive",
                            }
                            : {
                                startsWith: value,
                                mode: "insensitive",
                            };
                        if ([
                            "first_name",
                            "last_name",
                            "phone_number",
                            "email",
                            "customer_address_1",
                            "customer_address_2",
                            "customer_address_3",
                            "customer_address_4",
                            "customer_tax_number",
                        ].includes(key)) {
                            whereClause.OR.push({
                                [key]: filterValue,
                            });
                        }
                        if (key === "contract") {
                            key = "contract_number";
                        }
                        else if (key === "company") {
                            key = "company_name";
                        }
                        if (["contract_number", "company_name", "license_plate"].includes(key)) {
                            whereClause.OR.push({
                                contracts: {
                                    some: {
                                        [key]: filterValue,
                                    },
                                },
                            });
                        }
                    }
                });
                const customers = yield prisma_1.default.customer.findMany({
                    where: whereClause.OR.length > 0 ? whereClause : undefined,
                    include: {
                        contracts: {
                            include: {
                                car: true,
                                company: true,
                            },
                        },
                    },
                });
                return customers;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createCustomer(newCustomerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.default.customer.create({
                    data: newCustomerData,
                });
                return customer;
            }
            catch (err) {
                throw new http_error_1.default("Customer could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCustomer = yield prisma_1.default.customer.delete({
                    where: { id: customerId },
                });
                return deletedCustomer;
            }
            catch (err) {
                throw new http_error_1.default("Customer could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    updateCustomer(customerId, newCustomerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCustomer = yield prisma_1.default.customer.update({
                    where: { id: customerId },
                    data: newCustomerData,
                    include: {
                        contracts: true,
                    },
                });
                return updatedCustomer;
            }
            catch (err) {
                throw new http_error_1.default("Customer does not exist", http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
            }
        });
    },
};
exports.default = customerService;
