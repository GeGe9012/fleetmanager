import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewCustomerData } from "../interfaces/serviceInterfaces";

const customerService = {
  async getAllCustomers(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = { OR: [] };

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          const filterValue = value.includes("%")
            ? {
                contains: value.replace(/%/g, ""),
                mode: "insensitive",
              }
            : {
                startsWith: value,
                mode: "insensitive",
              };
          if (
            [
              "first_name",
              "last_name",
              "phone_number",
              "email",
              "customer_address_1",
              "customer_address_2",
              "customer_address_3",
              "customer_address_4",
              "customer_tax_number",
            ].includes(key)
          ) {
            whereClause.OR.push({
              [key]: filterValue,
            });
          }

          if (key === "contract") {
            key = "contract_number";
          } else if (key === "company") {
            key = "company_name";
          }

          if (
            ["contract_number", "company_name", "license_plate"].includes(key)
          ) {
            whereClause.OR.push({
              contracts: {
                some: {
                  [key]: filterValue,
                },
              },
            });
          }
        }
      });

      const customers = await prisma.customer.findMany({
        where: whereClause.OR.length > 0 ? whereClause : undefined,
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
        include: {
          contracts: true,
        },
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
