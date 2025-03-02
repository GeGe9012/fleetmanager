import axios from "axios";
import { BACKEND_URL } from '../constants/backend';

export async function getAllCars(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/product`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
