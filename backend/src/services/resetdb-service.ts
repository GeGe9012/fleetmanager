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
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.warranty.deleteMany();
        await tx.warranty.createMany({ data: warranties });
        await tx.color.deleteMany();
        await tx.color.createMany({ data: colors });
        await tx.make.deleteMany();
        await tx.make.createMany({ data: makes });
        await tx.car.deleteMany();
        await tx.car.createMany({ data: cars });
        await tx.company.deleteMany();
        await tx.company.createMany({ data: companies });
        await tx.customer.deleteMany();
        await tx.customer.createMany({ data: customers });
        await tx.contract.deleteMany();
        await tx.contract.createMany({ data: contracts });
      });
    } catch (error) {
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default resetDbService;

