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
  async resetDatabase(req, res) {
    try {
      res.status(200).send("Test endpoint works.");
    } catch (error) {
      throw new HttpError(
        "Failed to reset database.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default resetDbService;
