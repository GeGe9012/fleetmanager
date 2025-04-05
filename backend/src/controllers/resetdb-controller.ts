import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import resetDbService from "../services/resetdb-service";

const resetDbController = {
  async resetDatabase(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await resetDbService.resetDatabase();
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      next(err);
    }
  },
};

export default resetDbController;
