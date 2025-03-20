import express from "express";
import companyController from "../controllers/company-controller";

const router = express.Router();

router.get("/", companyController.getAllCompanies);

export default router;