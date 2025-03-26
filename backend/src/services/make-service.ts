import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const makeService = {
  async getAllMakes() {
    try {
      const makes = await prisma.make.findMany();
      return makes;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createMake(newMakeData: { name: string }) {
    try {
      const make = await prisma.make.create({
        data: newMakeData,
      });
      return make;
    } catch (err) {
        console.log(err)
      throw new HttpError(
        "Make could not be created.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteMake(makeId: string) {
    try {
      const deletedMake = await prisma.make.delete({
        where: { id: makeId },
      });
      return deletedMake;
    } catch (err) {
      throw new HttpError(
        "Make could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default makeService;
