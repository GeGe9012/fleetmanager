import { NextFunction, Request, Response } from "express";
import customerService from "../services/customer-service";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";

const customerController = {
  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.getAllCustomers(req.query);
      res.json(customers);
    } catch (err) {
      next(err);
    }
  },
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await customerService.createCustomer(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(newCustomer);
    } catch (err) {
      next(err);
    }
  },
  async deleteCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { customerId } = req.params;

      const deletedCustomer = await customerService.deleteCustomer(customerId);
      res.status(HTTP_STATUS_CODES.OK).json(deletedCustomer);
    } catch (err) {
      next(err);
    }
  },
  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCustomer = await customerService.updateCustomer(
        req.params.customerId,
        req.body
      );
      res.status(HTTP_STATUS_CODES.ACCEPTED).json(updatedCustomer);
    } catch (err) {
      next(err);
    }
  },
};

export default customerController;
