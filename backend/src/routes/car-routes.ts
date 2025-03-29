import express from "express";
import carController from "../controllers/car-controller";
import yupValidate from "../middleware/validate";
import createCarSchema from "../schemas/car-schema";

const router = express.Router();

router.get("/", carController.getAllCars);
router.post("/", yupValidate(createCarSchema), carController.createCar);
router.delete("/:carId", carController.deleteCar);
router.patch("/:carId", carController.updateCar);

export default router;
