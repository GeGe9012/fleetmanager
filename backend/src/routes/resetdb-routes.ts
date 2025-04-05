import express from "express";
import resetDbController from "../controllers/resetdb-controller";

const router = express.Router();

router.get("/", resetDbController.resetDatabase);

export default router;
