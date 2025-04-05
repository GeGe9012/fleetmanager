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
      await prisma.warranty.deleteMany();
      await prisma.warranty.createMany({ data: warranties });
      await prisma.color.deleteMany();
      await prisma.color.createMany({ data: colors });
      await prisma.make.deleteMany();
      await prisma.make.createMany({ data: makes });
      await prisma.car.deleteMany();
      await prisma.car.createMany({ data: cars });
      await prisma.company.deleteMany();
      await prisma.company.createMany({ data: companies });
      await prisma.customer.deleteMany();
      await prisma.customer.createMany({ data: customers });
      await prisma.contract.deleteMany();
      await prisma.contract.createMany({ data: contracts });
    } catch (error) {
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default resetDbService;
