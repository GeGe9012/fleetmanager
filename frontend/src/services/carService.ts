import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Car } from "../interfaces/serviceInterfaces";

export async function getAllCars(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/cars`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching cars:", error);
    throw new Error("Failed to fetch cars. Please try again later!");
  }
}

export async function createCar(car: Car) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/cars`, {
      ...car,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage && errorMessage.includes("Car already exists!")) {
          console.error("Car already exists:", error);
          throw error;
        }
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}

export async function deleteCar(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting car:", error);
    throw new Error("Failed to delete car. Please try again later!");
  }
}
