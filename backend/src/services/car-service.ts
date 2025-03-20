import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

interface NewCarData {
  license_plate: string;
  make: string;
  model: string;
  model_year: number;
  color: string;
  fuel_type: string;
  vin: string;
  reg_date: string;
  drivetrain: string;
  warranty: string;
}

const carService = {
  async getAllCars(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = {};

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (["model_year", "reg_date"].includes(key)) {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              const min = numValue * Math.pow(10, 4 - value.length);
              const max = (numValue + 1) * Math.pow(10, 4 - value.length);
              whereClause[key] = { gte: min, lt: max };
            }
          } else {
            if (value.includes("%")) {
              whereClause[key] = {
                contains: value.replace(/%/g, ""),
                mode: "insensitive",
              };
            } else {
              whereClause[key] = { startsWith: value, mode: "insensitive" };
            }
          }
        }
      });

      const cars = await prisma.car.findMany({ where: whereClause });
      return cars;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createCar(newCarData: NewCarData) {
    try {
      const car = await prisma.car.create({
        data: newCarData,
      });
      return car;
    } catch (err: any) {
      console.error("Prisma Error:", err);
      throw new HttpError(
        err.message || "Car could not be created.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default carService;
