import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import warranties from "../constants/warranties.json";
import colors from "../constants/colors.json";
import makes from "../constants/makes.json";
import cars from "../constants/cars.json";
import companies from "../constants/companies.json";
import customers from "../constants/customers.json";
import contracts from "../constants/contracts.json";
import { Prisma } from "@prisma/client";

const resetDbService = {
  async resetDatabase() {
    try {
      await Promise.all([
        prisma.warranty.deleteMany(),
        prisma.color.deleteMany(),
        prisma.make.deleteMany(),
        prisma.car.deleteMany(),
        prisma.company.deleteMany(),
        prisma.customer.deleteMany(),
        prisma.contract.deleteMany(),
      ]);
      await Promise.all([
        prisma.warranty.createMany({ data: warranties }),
        prisma.color.createMany({ data: colors }),
        prisma.make.createMany({ data: makes }),
        prisma.car.createMany({ data: cars }),
        prisma.company.createMany({ data: companies }),
        prisma.customer.createMany({ data: customers }),
        prisma.contract.createMany({ data: contracts }),
      ]);
    } catch (error) {
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default resetDbService;
