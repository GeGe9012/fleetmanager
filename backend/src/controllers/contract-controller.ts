import { NextFunction, Request, Response } from "express";
import customerService from "../services/customer-service";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import contractService from "../services/contract-service";

const contractController = {
  async createContract(req: Request, res: Response, next: NextFunction) {
    try {
      const newContract = await contractService.createContract(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newContract);
    } catch (err) {
      next(err);
    }
  },
};

export default contractController;
