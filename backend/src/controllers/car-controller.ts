import { Request, Response } from "express";
import carService from "../services/car-service";

const carController = {
    async getAllCars(req: Request, res: Response) {
        try {
            const vehicles = await carService.getAllCars();
            res.json(vehicles);
        } catch (error) {
            res.status(500).json({ error: "Hiba történt az adatok lekérése közben." });
        }
    }
};

export default carController;
