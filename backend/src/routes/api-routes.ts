import express from "express";
import carRoutes from "./car-routes";
import customerRoutes from "./customer-routes"

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/customers", customerRoutes);

export default router;
