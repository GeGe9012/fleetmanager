import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import colorService from "../services/color-service";

const colorController = {
  async getAllColors(req: Request, res: Response, next: NextFunction) {
    try {
      const colors = await colorService.getAllColors();
      res.status(HTTP_STATUS_CODES.OK).json(colors);
    } catch (err) {
      next(err);
    }
  },
  async createColor(req: Request, res: Response, next: NextFunction) {
    try {
      const newColor = await colorService.createColor(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newColor);
    } catch (err) {
      next(err);
    }
  },
  async deleteColor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { colorId } = req.params;

      const deletedColor = await colorService.deleteColor(colorId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedColor);
    } catch (err) {
      next(err);
    }
  },
};

export default colorController;
