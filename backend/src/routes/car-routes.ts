import express from "express";
import carController from "../controllers/car-controller";

const router = express.Router();

router.get("/", carController.getAllCars);
router.post("/", carController.createCar);
router.delete("/:carId", carController.deleteCar)

export default router;
