import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function getAllCompanies(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/companies`, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching companies:", error);
    throw new Error("Failed to fetch companies. Please try again later!");
  }
}
