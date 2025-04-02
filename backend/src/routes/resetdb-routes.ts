import express from "express";
import resetDbService from "../services/resetdb-service";

const router = express.Router();

router.post("/", resetDbService.resetDatabase);

export default router;
