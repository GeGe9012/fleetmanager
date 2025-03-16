import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const customerService = {
    async getAllCustomers() {
        try {
            const customers = await prisma.customer.findMany();
            return customers;
          } catch (err) {
            throw new HttpError(
              "Something went wrong",
              HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            );
          }
    }
};

export default customerService;