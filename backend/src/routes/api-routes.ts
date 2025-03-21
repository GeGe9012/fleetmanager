import express from "express";
import carRoutes from "./car-routes";
import customerRoutes from "./customer-routes";
import companyRoutes from "./company-routes";

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/customers", customerRoutes);
router.use("/companies", companyRoutes);

export default router;
