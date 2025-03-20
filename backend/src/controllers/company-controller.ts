import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import companyService from "../services/company-service";

const companyController = {
  async getAllCompanies(req: Request, res: Response) {
    try {
      const customers = await companyService.getAllCompanies(req.query);
      res.json(customers);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while retrieving the data." });
    }
  },
};

export default companyController;
