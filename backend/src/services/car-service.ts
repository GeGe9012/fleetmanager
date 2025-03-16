import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const carService = {
  async getAllCars(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = {};

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (["model_year", "reg_date"].includes(key)) {
            // Ha a beírt érték szám, akkor intervallumos keresés
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              const min = numValue * Math.pow(10, 4 - value.length);
              const max = (numValue + 1) * Math.pow(10, 4 - value.length);
              whereClause[key] = { gte: min, lt: max };
            }
          } else {
            if (value.includes("%")) {
              whereClause[key] = { contains: value.replace(/%/g, ""), mode: "insensitive" };
            } else {
              whereClause[key] = { startsWith: value, mode: "insensitive" };
            }
          }
        }
      });

      const cars = await prisma.car.findMany({ where: whereClause });
      return cars;
    } catch (err) {
      throw new HttpError("Something went wrong", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
};

export default carService;

