import express from "express";
import carRoutes from "./car-routes";
import customerRoutes from "./customer-routes";
import companyRoutes from "./company-routes";
import contractRoutes from "./contract-routes";
import colorRoutes from "./color-routes";
import makeRoutes from "./make-routes";
import warrantyRoutes from "./warranty-routes";
// import resetDbRoutes from "./resetdb-routes"

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/customers", customerRoutes);
router.use("/companies", companyRoutes);
router.use("/contracts", contractRoutes);
router.use("/colors", colorRoutes);
router.use("/makes", makeRoutes);
router.use("/warranties", warrantyRoutes);
// router.use("/resetdb", resetDbRoutes);

export default router;
