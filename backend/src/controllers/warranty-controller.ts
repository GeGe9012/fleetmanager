import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import warrantyService from "../services/warranty-service";

const warrantyController = {
  async getAllWarranties(req: Request, res: Response, next: NextFunction) {
    try {
      const warranties = await warrantyService.getAllWarranties();
      res.status(HTTP_STATUS_CODES.OK).json(warranties);
    } catch (err) {
      next(err);
    }
  },
  async createWarranty(req: Request, res: Response, next: NextFunction) {
    try {
      const newWarranty = await warrantyService.createWarranty(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newWarranty);
    } catch (err) {
      next(err);
    }
  },
  async deleteWarranty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { warrantyId } = req.params;

      const deletedWarranty = await warrantyService.deleteWarranty(warrantyId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedWarranty);
    } catch (err) {
      next(err);
    }
  },
};

export default warrantyController;
