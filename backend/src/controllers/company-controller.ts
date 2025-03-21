import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import companyService from "../services/company-service";

const companyController = {
  async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await companyService.getAllCompanies(req.query);
      res.json(companies);
    } catch (err) {
      next(err);
    }
  },
  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const newCompany = await companyService.createCompany(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCompany);
    } catch (err) {
      next(err);
    }
  },

  async deleteCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { companyId } = req.params;

      const deletedCompany = await companyService.deleteCompany(companyId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCompany);
    } catch (err) {
      next(err);
    }
  },

  async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCompany = await companyService.updateCompany(
        req.params.companyId,
        req.body
      );
      res.status(HTTP_STATUS_CODES.ACCEPTED).json(updatedCompany);
    } catch (err) {
      next(err);
    }
  },
};

export default companyController;
