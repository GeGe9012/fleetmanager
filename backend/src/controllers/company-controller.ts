import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import companyService from "../services/company-service";

const companyController = {
  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await companyService.getAllCompanies(req.query);
      res.json(companies);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while retrieving the data." });
    }
  },
  async createCompany(req: Request, res: Response) {
    try {
      const newCompany = await companyService.createCompany(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCompany);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while creating data." });
    }
  },

  async deleteCompany(req: Request, res: Response): Promise<void>  {
    try {
      const { companyId } = req.params;
  
      const deletedCompany = await companyService.deleteCompany(companyId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCompany);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while deleting data." });
    }
  }
};

export default companyController;
