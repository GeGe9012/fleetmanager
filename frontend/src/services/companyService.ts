import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Company } from "../interfaces/serviceInterfaces";

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
    const response = await axios.post(`${BACKEND_URL}/api/companies`, {
      ...company,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating company:", error);
    throw new Error("Failed to create company. Please try again later!");
  }
}

export async function deleteCommpany(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting company:", error);
    throw new Error("Failed to delete company. Please try again later!");
  }
}
