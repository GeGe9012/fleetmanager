import { Request, Response } from "express";
import carService from "../services/car-service";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";

const carController = {
  async getAllCars(req: Request, res: Response) {
    try {
      const cars = await carService.getAllCars(req.query);
      res.status(HTTP_STATUS_CODES.OK).json(cars);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while retrieving the data." });
    }
  },
  async createCar(req: Request, res: Response) {
    try {
      const newCar = await carService.createCar(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCar);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while creating data." });
    }
  },
  async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const { carId } = req.params;

      const deletedCar = await carService.deleteCar(carId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCar);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while deleting data." });
    }
  },

  async updateCar(req: Request, res: Response) {
    try {
      const updatedCar = await carService.updateCar(req.params.carId, req.body);
      res.status(HTTP_STATUS_CODES.ACCEPTED).json(updatedCar);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while updating data." });
    }
  },
};

export default carController;
