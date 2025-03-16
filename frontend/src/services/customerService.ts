import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function getAllCustomers(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/customers`, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching cars:", error);
    throw new Error("Failed to fetch cars. Please try again later!");
  }
}
