import { NextFunction, Request, Response } from "express";
import carService from "../services/car-service";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";

const carController = {
  async getAllCars(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await carService.getAllCars(req.query);
      res.status(HTTP_STATUS_CODES.OK).json(cars);
    } catch (err) {
      next(err);
    }
  },
  async createCar(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await carService.createCar(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCar);
    } catch (err) {
      next(err);
    }
  },
  async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carId } = req.params;

      const deletedCar = await carService.deleteCar(carId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCar);
    } catch (err) {
      next(err);
    }
  },

  async updateCar(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCar = await carService.updateCar(req.params.carId, req.body);
      res.status(HTTP_STATUS_CODES.ACCEPTED).json(updatedCar);
    } catch (err) {
      next(err);
    }
  },
};

export default carController;
