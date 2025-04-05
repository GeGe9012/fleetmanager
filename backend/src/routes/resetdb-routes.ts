import express from "express";
import resetDbController from "../controllers/resetdb-controller";

const router = express.Router();

router.delete("/", resetDbController.deleteDatabase);
router.post("/", resetDbController.resetDatabase);

export default router;
