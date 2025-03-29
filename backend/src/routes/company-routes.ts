import express from "express";
import companyController from "../controllers/company-controller";
import yupValidate from "../middleware/validate";
import createCompanySchema from "../schemas/company-schema";

const router = express.Router();

router.get("/", companyController.getAllCompanies);
router.post(
  "/",
  yupValidate(createCompanySchema),
  companyController.createCompany
);
router.delete("/:companyId", companyController.deleteCompany);
router.patch("/:companyId", companyController.updateCompany);

export default router;
