import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import contractService from "../services/contract-service";

const contractController = {
  async getAllContracts(req: Request, res: Response, next: NextFunction) {
    try {
      const contracts = await contractService.getAllContracts(req.query);
      res.status(HTTP_STATUS_CODES.OK).json(contracts);
    } catch (err) {
      next(err);
    }
  },
  async createContract(req: Request, res: Response, next: NextFunction) {
    try {
      const newContract = await contractService.createContract(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newContract);
    } catch (err) {
      next(err);
    }
  },
  async deleteContract(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { contractId } = req.params;

      const deletedContract = await contractService.deleteContract(contractId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedContract);
    } catch (err) {
      next(err);
    }
  },
};

export default contractController;
