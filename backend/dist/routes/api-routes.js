"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_routes_1 = __importDefault(require("./car-routes"));
const customer_routes_1 = __importDefault(require("./customer-routes"));
const company_routes_1 = __importDefault(require("./company-routes"));
const contract_routes_1 = __importDefault(require("./contract-routes"));
const color_routes_1 = __importDefault(require("./color-routes"));
const make_routes_1 = __importDefault(require("./make-routes"));
const warranty_routes_1 = __importDefault(require("./warranty-routes"));
const router = express_1.default.Router();
router.use("/cars", car_routes_1.default);
router.use("/customers", customer_routes_1.default);
router.use("/companies", company_routes_1.default);
router.use("/contracts", contract_routes_1.default);
router.use("/colors", color_routes_1.default);
router.use("/makes", make_routes_1.default);
router.use("/warranties", warranty_routes_1.default);
exports.default = router;
