import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import makeService from "../services/make-service";

const makeController = {
  async getAllMakes(req: Request, res: Response, next: NextFunction) {
    try {
      const makes = await makeService.getAllMakes();
      res.status(HTTP_STATUS_CODES.OK).json(makes);
    } catch (err) {
      next(err);
    }
  },
  async createMake(req: Request, res: Response, next: NextFunction) {
    try {
      const newMake = await makeService.createMake(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newMake);
    } catch (err) {
      next(err);
    }
  },
  async deleteMake(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { makeId } = req.params;

      const deletedMake = await makeService.deleteMake(makeId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedMake);
    } catch (err) {
      next(err);
    }
  },
};

export default makeController;
