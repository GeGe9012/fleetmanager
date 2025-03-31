"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const warranty_controller_1 = __importDefault(require("../controllers/warranty-controller"));
const warranty_schema_1 = __importDefault(require("../schemas/warranty-schema"));
const router = express_1.default.Router();
router.get("/", warranty_controller_1.default.getAllWarranties);
router.post("/", (0, validate_1.default)(warranty_schema_1.default), warranty_controller_1.default.createWarranty);
router.delete("/:warrantyId", warranty_controller_1.default.deleteWarranty);
exports.default = router;
