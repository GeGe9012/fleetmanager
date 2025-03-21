import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

interface NewCustomerData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_address_3: string;
  customer_address_4: string;
  customer_tax_number: string;
}

const customerService = {
  async getAllCustomers(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (value.includes("%")) {
            whereClause[key] = {
              contains: value.replace(/%/g, ""),
              mode: "insensitive",
            };
          } else {
            whereClause[key] = { startsWith: value, mode: "insensitive" };
          }
        }
      });
      const customers = await prisma.customer.findMany({ where: whereClause });
      return customers;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createCustomer(newCustomerData: NewCustomerData) {
    try {
      const customer = await prisma.customer.create({
        data: newCustomerData,
      });
      return customer;
    } catch (err) {
      throw new HttpError(
        "Customer could not be created.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteCustomer(customerId: string) {
    try {
      const deletedCustomer = await prisma.customer.delete({
        where: { id: customerId },
      });
      return deletedCustomer;
    } catch (err) {
      throw new HttpError(
        "Customer could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default customerService;
