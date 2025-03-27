import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const warrantyService = {
  async getAllWarranties() {
    try {
      const warranties = await prisma.warranty.findMany();
      return warranties;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createWarranty(newWarrantyData: { name: string }) {
    try {
      const warranty = await prisma.warranty.create({
        data: newWarrantyData,
      });
      return warranty;
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new HttpError(
          "Warranty term already exists!",
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      } else {
        throw new HttpError(
          "Warranty term could not be created.",
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
    }
  },

  async deleteWarranty(warrantyId: string) {
    try {
      const deletedWarranty = await prisma.warranty.delete({
        where: { id: warrantyId },
      });
      return deletedWarranty;
    } catch (err) {
      throw new HttpError(
        "Warranty term could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default warrantyService;
