import express from "express";
import yupValidate from "../middleware/validate";
import makeController from "../controllers/make-controller";
import createMakeSchema from "../schemas/make-schema";

const router = express.Router();

router.get("/", makeController.getAllMakes);
router.post("/", yupValidate(createMakeSchema), makeController.createMake);
router.delete("/:makeId", makeController.deleteMake);

export default router;
