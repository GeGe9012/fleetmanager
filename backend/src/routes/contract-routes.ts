import express from "express";
import yupValidate from "../middleware/validate";
import contractController from "../controllers/contract-controller";
import createContractSchema from "../schemas/contract-schema";

const router = express.Router();

router.get("/", contractController.getAllContracts);
router.post(
  "/",
  yupValidate(createContractSchema),
  contractController.createContract
);
router.delete("/:contractId", contractController.deleteContract);

export default router;
