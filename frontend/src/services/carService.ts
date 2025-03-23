import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Car } from "../interfaces/serviceInterfaces";

export async function getAllCars(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/cars`, {
      params: queryParams,
    });
    console.log(response.data)
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
    console.error("An error occurred while creating car:", error);
    throw new Error("Failed to create car. Please try again later!");
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
