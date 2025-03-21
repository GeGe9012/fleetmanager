import express from "express";
import carController from "../controllers/car-controller";

const router = express.Router();

router.get("/", carController.getAllCars);
router.post("/", carController.createCar);
router.delete("/:carId", carController.deleteCar);
router.patch("/:carId", carController.updateCar);

export default router;
