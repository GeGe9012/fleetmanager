"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = __importDefault(require("../controllers/company-controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const company_schema_1 = __importDefault(require("../schemas/company-schema"));
const router = express_1.default.Router();
router.get("/", company_controller_1.default.getAllCompanies);
router.post("/", (0, validate_1.default)(company_schema_1.default), company_controller_1.default.createCompany);
router.delete("/:companyId", company_controller_1.default.deleteCompany);
router.patch("/:companyId", company_controller_1.default.updateCompany);
exports.default = router;
