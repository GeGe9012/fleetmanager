"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const color_controller_1 = __importDefault(require("../controllers/color-controller"));
const color_schema_1 = __importDefault(require("../schemas/color-schema"));
const router = express_1.default.Router();
router.get("/", color_controller_1.default.getAllColors);
router.post("/", (0, validate_1.default)(color_schema_1.default), color_controller_1.default.createColor);
router.delete("/:colorId", color_controller_1.default.deleteColor);
exports.default = router;
