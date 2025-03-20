import express from "express";
import companyController from "../controllers/company-controller";

const router = express.Router();

router.get("/", companyController.getAllCompanies);
router.post("/", companyController.createCompany);

export default router;