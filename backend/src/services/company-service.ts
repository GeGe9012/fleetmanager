import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

const companyService = {
  async getAllCompanies(filters: Record<string, any> = {}) {
    try {
      const whereClause: Record<string, any> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (value.includes("%")) {
            whereClause[key] = {
              contains: value.replace(/%/g, ""),
              mode: "insensitive",
            };
          } else {
            whereClause[key] = { startsWith: value, mode: "insensitive" };
          }
        }
      });
      const companies = await prisma.company.findMany({ where: whereClause });
      return companies;
    } catch (err) {
      throw new HttpError(
        "Something went wrong",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default companyService;