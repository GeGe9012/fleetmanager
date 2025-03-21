import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";
import { NewCompanyData } from "../interfaces/serviceInterfaces";

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

  async createCompany(NewCompanyData: NewCompanyData) {
    try {
      const company = await prisma.company.create({
        data: NewCompanyData,
      });
      return company;
    } catch (err) {
      throw new HttpError(
        "Company could not be created.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async deleteCompany(companyId: string) {
    try {
      const deletedCompany = await prisma.company.delete({
        where: { id: companyId },
      });
      return deletedCompany;
    } catch (err) {
      throw new HttpError(
        "Company could not be deleted.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },

  async updateCompany(companyId: string, newCompanyData: NewCompanyData) {
    try {
      const updatedCompany = await prisma.company.update({
        where: { id: companyId },
        data: newCompanyData,
      });
      return updatedCompany;
    } catch (err) {
      throw new HttpError(
        "Company does not exist",
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
  },
};

export default companyService;
