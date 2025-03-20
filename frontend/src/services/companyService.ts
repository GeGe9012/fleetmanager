import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

interface Company {
  company: string;
  company_tax_number: string;
  contact_phone_number: string;
  reg_number: string;
  company_address_1: string;
  company_address_2: string;
  company_address_3: string;
  company_address_4: string;
}

export async function getAllCompanies(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/companies`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching companies:", error);
    throw new Error("Failed to fetch companies. Please try again later!");
  }
}

export async function createCompany(company: Company) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/companies`,
      {
        ...company,
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating company:", error);
    throw new Error("Failed to create company. Please try again later!");
  }
}
