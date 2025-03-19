import { Request, Response } from "express";
import customerService from "../services/customer-service";

const customerController = {
    async getAllCustomers(req: Request, res: Response) {
        try {
            const customers = await customerService.getAllCustomers(req.query);
            res.json(customers);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while retrieving the data." });
        }
    }
};

export default customerController;