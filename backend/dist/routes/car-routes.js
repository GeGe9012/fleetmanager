"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_1 = __importDefault(require("../controllers/car-controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const car_schema_1 = __importDefault(require("../schemas/car-schema"));
const router = express_1.default.Router();
router.get("/", car_controller_1.default.getAllCars);
router.post("/", (0, validate_1.default)(car_schema_1.default), car_controller_1.default.createCar);
router.delete("/:carId", car_controller_1.default.deleteCar);
router.patch("/:carId", car_controller_1.default.updateCar);
exports.default = router;
