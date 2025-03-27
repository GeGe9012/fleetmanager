import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewCarData } from "../interfaces/serviceInterfaces";

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

      const cars = await prisma.car.findMany({
        where: whereClause,
        include: {
          contract: {
            include: {
              company: true,
              customer: true,
            },
          },
        },
      });
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
      if (err.code === "P2002") {
        throw new HttpError(
          "Car already exists!",
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      } else {
        throw new HttpError(
          "Car could not be created.",
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
    }
  },

  async deleteCar(carId: string) {
    try {
      const deletedCar = await prisma.car.delete({
        where: { id: carId },
      });
      return deletedCar;
    } catch (err) {
      throw new HttpError(
        "Car could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateCar(carId: string, newCarData: NewCarData) {
    try {
      const updatedCar = await prisma.car.update({
        where: { id: carId },
        data: newCarData,
      });
      return updatedCar;
    } catch (err) {
      throw new HttpError("Car does not exist", HTTP_STATUS_CODES.NOT_FOUND);
    }
  },
};

export default carService;
