import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function getAllMakes() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/makes`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching makes:", error);
    throw new Error("Failed to fetch makes. Please try again later!");
  }
}

export async function createMake(make: { name: string }) {
  try {
    const makeLowerCase = make.name.toLowerCase();
    const response = await axios.post(`${BACKEND_URL}/api/makes`, {
      name: makeLowerCase,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage && errorMessage.includes("Make already exists!")) {
          console.error("Make already exists:", error);
          throw error;
        }
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}

export async function deleteMake(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/makes/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting make:", error);
    throw new Error("Failed to delete make. Please try again later!");
  }
}
