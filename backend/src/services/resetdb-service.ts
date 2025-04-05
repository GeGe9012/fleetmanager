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
      // Törlés batch-ben
      await prisma.warranty.deleteMany();
      await prisma.color.deleteMany();
      await prisma.make.deleteMany();
      await prisma.car.deleteMany();
      await prisma.company.deleteMany();  // Törlés először
      await prisma.customer.deleteMany();
      await prisma.contract.deleteMany();

      // Létrehozás batch-ben
      await this.createBatch(warranties, prisma.warranty);
      await this.createBatch(colors, prisma.color);
      await this.createBatch(makes, prisma.make);
      await this.createBatch(cars, prisma.car);

      // Először a company-ket hozom létre
      await this.createBatch(companies, prisma.company);

      // Majd a contract-ok létrehozása a companies-re hivatkozva
      await this.createBatch(customers, prisma.customer);

      // Végül a contract-ok létrehozása
      await this.createBatch(contracts, prisma.contract);

    } catch (error) {
      console.error("Hiba történt az adatbázis resetelésekor:", error);
      throw new HttpError("Failed to reset database.", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  },

  async createBatch(data: any[], model: any) {
    const batchSize = 1000;  // Mennyiség, amit egyszerre küldesz
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await model.createMany({ data: batch });
    }
  },
};

export default resetDbService;

