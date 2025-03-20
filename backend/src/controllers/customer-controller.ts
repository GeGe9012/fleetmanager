import { Request, Response } from "express";
import customerService from "../services/customer-service";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";

const customerController = {
  async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await customerService.getAllCustomers(req.query);
      res.json(customers);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while retrieving the data." });
    }
  },
};

export default customerController;
