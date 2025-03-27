import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const colorService = {
  async getAllColors() {
    try {
      const colors = await prisma.color.findMany();
      return colors;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async createColor(newColorData: { name: string }) {
    try {
      const color = await prisma.color.create({
        data: newColorData,
      });
      return color;
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new HttpError(
          "Color already exists!",
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      } else {
        throw new HttpError(
          "Color could not be created.",
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
    }
  },

  async deleteColor(colorId: string) {
    try {
      const deletedColor = await prisma.color.delete({
        where: { id: colorId },
      });
      return deletedColor;
    } catch (err) {
      throw new HttpError(
        "Color could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default colorService;
