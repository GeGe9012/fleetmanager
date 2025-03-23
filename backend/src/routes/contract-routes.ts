import express from "express";
import yupValidate from "../middleware/validate";
import contractController from "../controllers/contract-controller";
import createContractSchema from "../schemas/contract-schema";

const router = express.Router();

router.post("/",yupValidate(createContractSchema), contractController.createContract);

export default router;