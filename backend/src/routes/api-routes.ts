import express from "express";
import carRoutes from "./car-routes";
import customerRoutes from "./customer-routes";
import companyRoutes from "./company-routes";
import contractRoutes from "./contract-routes";

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/customers", customerRoutes);
router.use("/companies", companyRoutes);
router.use("/contracts", contractRoutes);

export default router;
