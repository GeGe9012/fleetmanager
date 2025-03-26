import express from "express";
import yupValidate from "../middleware/validate";
import colorController from "../controllers/color-controller";
import createColorSchema from "../schemas/color-schema";

const router = express.Router();

router.get("/", colorController.getAllColors);
router.post("/", yupValidate(createColorSchema), colorController.createColor);
router.delete("/:colorId", colorController.deleteColor);

export default router;
