import express from "express";
import carController from "../controllers/car-controller";

const router = express.Router();

router.get("/", carController.getAllCars);

export default router;
