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
  async createCustomer(req: Request, res: Response) {
    try {
      const newCustomer = await customerService.createCustomer(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCustomer);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while creating data." });
    }
  },
  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { customerId } = req.params;

      const deletedCustomer = await customerService.deleteCustomer(customerId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCustomer);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while deleting data." });
    }
  },
  async updateCustomer(req: Request, res: Response) {
    try {
      const updatedCustomer = await customerService.updateCustomer(
        req.params.customerId,
        req.body
      );
      res.status(HTTP_STATUS_CODES.ACCEPTED).json(updatedCustomer);
    } catch (err) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while updating data." });
    }
  },
};

export default customerController;
