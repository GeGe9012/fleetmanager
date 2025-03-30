import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewCarData } from "../interfaces/serviceInterfaces";

const carService = {
  async getAllCars(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = {
        OR: [],
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (
            [
              "license_plate",
              "make",
              "model",
              "model_year",
              "color",
              "fuel_type",
              "vin",
              "reg_date",
              "drivetrain",
              "warranty",
            ].includes(key)
          ) {
            whereClause.OR.push({
              [key]: {
                startsWith: value,
                mode: "insensitive",
              },
            });
          }

          if (
            ["contract_number", "company_name", "contract_exp"].includes(key)
          ) {
            whereClause.OR.push({
              contract: {
                [key]: {
                  startsWith: value,
                  mode: "insensitive",
                },
              },
            });
          }
        }
      });

      const cars = await prisma.car.findMany({
        ...(whereClause.OR.length > 0 ? { where: whereClause } : {}),
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

  async updateCar(carId: string, carData: NewCarData) {
    try {
      const existingCar = await prisma.car.findUnique({
        where: { id: carId },
        select: { contract_id: true },
      });

      if (!existingCar) throw new Error("Car not found");

      const updatedCar = await prisma.car.update({
        where: { id: carId },
        data: {
          ...carData,
          contract_id: existingCar.contract_id,
        },
        include: {
          contract: {
            select: {
              company_name: true,
              contract_number: true,
              contract_exp: true,
            },
          },
        },
      });
      return updatedCar;
    } catch (err) {
      throw new HttpError("Car does not exist", HTTP_STATUS_CODES.NOT_FOUND);
    }
  },
};

export default carService;
