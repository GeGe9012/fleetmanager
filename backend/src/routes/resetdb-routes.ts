import express from "express";
import resetDbController from "../controllers/resetdb-controller";

const router = express.Router();

router.post("/", resetDbController.resetDatabase);

export default router;
