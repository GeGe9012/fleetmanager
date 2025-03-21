import express from "express";
import companyController from "../controllers/company-controller";

const router = express.Router();

router.get("/", companyController.getAllCompanies);
router.post("/", companyController.createCompany);
router.delete("/:companyId", companyController.deleteCompany);

export default router;