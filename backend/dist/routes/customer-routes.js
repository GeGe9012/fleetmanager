"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = __importDefault(require("../controllers/customer-controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const customer_schema_1 = __importDefault(require("../schemas/customer-schema"));
const router = express_1.default.Router();
router.get("/", customer_controller_1.default.getAllCustomers);
router.post("/", (0, validate_1.default)(customer_schema_1.default), customer_controller_1.default.createCustomer);
router.delete("/:customerId", customer_controller_1.default.deleteCustomer);
router.patch("/:customerId", customer_controller_1.default.updateCustomer);
exports.default = router;
