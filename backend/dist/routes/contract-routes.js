"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const contract_controller_1 = __importDefault(require("../controllers/contract-controller"));
const contract_schema_1 = __importDefault(require("../schemas/contract-schema"));
const router = express_1.default.Router();
router.get("/", contract_controller_1.default.getAllContracts);
router.post("/", (0, validate_1.default)(contract_schema_1.default), contract_controller_1.default.createContract);
router.delete("/:contractId", contract_controller_1.default.deleteContract);
exports.default = router;
