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
      const newProduct = await carService.createCar(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newProduct);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while creating data." });
    }
  },
};

export default carController;
