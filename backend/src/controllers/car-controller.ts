import { Request, Response } from "express";
import carService from "../services/car-service";

const carController = {
    async getAllCars(req: Request, res: Response) {
        try {
            const cars = await carService.getAllCars(req.query);
            res.json(cars);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while retrieving the data." });
        }
    }
};

export default carController;
