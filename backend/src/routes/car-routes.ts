import express from "express";
import carController from "../controllers/car-controller";

const router = express.Router();

router.get("/", carController.getAllCars);
router.post("/", carController.createCar);

export default router;
