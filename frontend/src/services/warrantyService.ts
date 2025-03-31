import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function getAllWarranties() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/warranties`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching warranties:", error);
    throw new Error("Failed to fetch warranties. Please try again later!");
  }
}

export async function createWarranty(warranty: { name: string }) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/warranties`, {
      ...warranty,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response?.data?.message;
        if (
          errorMessage &&
          errorMessage.includes("Warranty term already exists!")
        ) {
          console.error("Warranty term already exists:", error);
          throw error;
        }
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}

export async function deleteWarranty(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/warranties/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting warranty:", error);
    throw new Error("Failed to delete warranty. Please try again later!");
  }
}
