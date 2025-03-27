import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function getAllColors() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/colors`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching colors:", error);
    throw new Error("Failed to fetch colors. Please try again later!");
  }
}

export async function createColor(color: { name: string }) {
  try {
    const colorLowerCase = color.name.toLowerCase();
    const response = await axios.post(`${BACKEND_URL}/api/colors`, {
      name: colorLowerCase,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage && errorMessage.includes("Color already exists!")) {
          console.error("Color already exists:", error);
          throw error;
        }
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}

export async function deleteColor(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/colors/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting color:", error);
    throw new Error("Failed to delete color. Please try again later!");
  }
}
