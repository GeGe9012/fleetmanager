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
const carService = {
    getAllCars() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            try {
                const whereClause = {
                    OR: [],
                };
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) {
                        if ([
                            "license_plate",
                            "make",
                            "model",
                            "model_year",
                            "color",
                            "fuel_type",
                            "vin",
                            "reg_date",
                            "drivetrain",
                            "warranty",
                        ].includes(key)) {
                            whereClause.OR.push({
                                [key]: {
                                    startsWith: value,
                                    mode: "insensitive",
                                },
                            });
                        }
                        if (["contract_number", "company_name", "contract_exp"].includes(key)) {
                            whereClause.OR.push({
                                contract: {
                                    [key]: {
                                        startsWith: value,
                                        mode: "insensitive",
                                    },
                                },
                            });
                        }
                    }
                });
                const cars = yield prisma_1.default.car.findMany(Object.assign(Object.assign({}, (whereClause.OR.length > 0 ? { where: whereClause } : {})), { include: {
                        contract: {
                            include: {
                                company: true,
                                customer: true,
                            },
                        },
                    } }));
                return cars;
            }
            catch (err) {
                throw new http_error_1.default("Something went wrong", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    createCar(newCarData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield prisma_1.default.car.create({
                    data: newCarData,
                });
                return car;
            }
            catch (err) {
                if (err.code === "P2002") {
                    throw new http_error_1.default("Car already exists!", http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
                }
                else {
                    throw new http_error_1.default("Car could not be created.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            }
        });
    },
    deleteCar(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCar = yield prisma_1.default.car.delete({
                    where: { id: carId },
                });
                return deletedCar;
            }
            catch (err) {
                throw new http_error_1.default("Car could not be deleted.", http_status_codes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        });
    },
    updateCar(carId, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCar = yield prisma_1.default.car.findUnique({
                    where: { id: carId },
                    select: { contract_id: true },
                });
                if (!existingCar)
                    throw new Error("Car not found");
                const updatedCar = yield prisma_1.default.car.update({
                    where: { id: carId },
                    data: Object.assign(Object.assign({}, carData), { contract_id: existingCar.contract_id }),
                    include: {
                        contract: {
                            select: {
                                company_name: true,
                                contract_number: true,
                                contract_exp: true,
                            },
                        },
                    },
                });
                return updatedCar;
            }
            catch (err) {
                throw new http_error_1.default("Car does not exist", http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
            }
        });
    },
};
exports.default = carService;
