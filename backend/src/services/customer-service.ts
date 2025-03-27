import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewCustomerData } from "../interfaces/serviceInterfaces";

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
      const customers = await prisma.customer.findMany({
        where: whereClause,
        include: {
          contracts: {
            include: {
              car: true,
              company: true,
            },
          },
        },
      });
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

  async updateCustomer(customerId: string, newCustomerData: NewCustomerData) {
    try {
      const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: newCustomerData,
      });
      return updatedCustomer;
    } catch (err) {
      throw new HttpError(
        "Customer does not exist",
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
  },
};

export default customerService;
