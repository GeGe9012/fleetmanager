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

const resetDbService = {
  async deleteDatabase() {
    try {
      await prisma.warranty.deleteMany();
      await prisma.color.deleteMany();
      await prisma.make.deleteMany();
      await prisma.car.deleteMany();
      await prisma.company.deleteMany();
      await prisma.customer.deleteMany();
      await prisma.contract.deleteMany();
    } catch (error) {
      console.log(error);
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
  async resetDatabase() {
    try {
      await prisma.warranty.createMany({ data: warranties });
      await prisma.color.createMany({ data: colors });
      await prisma.make.createMany({ data: makes });
      await prisma.car.createMany({ data: cars });
      await prisma.company.createMany({ data: companies });
      await prisma.customer.createMany({ data: customers });
      await prisma.contract.createMany({ data: contracts });
    } catch (error) {
      console.log(error);
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default resetDbService;
