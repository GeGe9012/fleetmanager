import express from "express";
import carRoutes from "./car-routes";

const router = express.Router();

router.use("/cars", carRoutes);

export default router;
