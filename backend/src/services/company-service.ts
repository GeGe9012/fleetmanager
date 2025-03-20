import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma";

interface NewCompanyData {
  company: string;
  company_tax_number: string;
  contact_phone_number: string;
  reg_number: string;
  company_address_1: string;
  company_address_2: string;
  company_address_3: string;
  company_address_4: string;
}

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
    } catch (err: any) {
      console.error("Prisma Error:", err);
      throw new HttpError(
        err.message || "Company could not be created.",
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

export default companyService;