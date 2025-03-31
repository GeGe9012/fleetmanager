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
const car_service_1 = __importDefault(require("../services/car-service"));
const http_status_codes_1 = require("../constants/http-status-codes");
const carController = {
    getAllCars(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield car_service_1.default.getAllCars(req.query);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(cars);
            }
            catch (err) {
                next(err);
            }
        });
    },
    createCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCar = yield car_service_1.default.createCar(req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).json(newCar);
            }
            catch (err) {
                next(err);
            }
        });
    },
    deleteCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { carId } = req.params;
                const deletedCar = yield car_service_1.default.deleteCar(carId);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).json(deletedCar);
            }
            catch (err) {
                next(err);
            }
        });
    },
    updateCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCar = yield car_service_1.default.updateCar(req.params.carId, req.body);
                res.status(http_status_codes_1.HTTP_STATUS_CODES.ACCEPTED).json(updatedCar);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = carController;
