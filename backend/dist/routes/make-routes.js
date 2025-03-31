"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const make_controller_1 = __importDefault(require("../controllers/make-controller"));
const make_schema_1 = __importDefault(require("../schemas/make-schema"));
const router = express_1.default.Router();
router.get("/", make_controller_1.default.getAllMakes);
router.post("/", (0, validate_1.default)(make_schema_1.default), make_controller_1.default.createMake);
router.delete("/:makeId", make_controller_1.default.deleteMake);
exports.default = router;
