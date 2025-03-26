import express from "express";
import yupValidate from "../middleware/validate";
import warrantyController from "../controllers/warranty-controller";
import createWarrantySchema from "../schemas/warranty-schema";

const router = express.Router();

router.get("/", warrantyController.getAllWarranties);
router.post(
  "/",
  yupValidate(createWarrantySchema),
  warrantyController.createWarranty
);
router.delete("/:warrantyId", warrantyController.deleteWarranty);

export default router;
