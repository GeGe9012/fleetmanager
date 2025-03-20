import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

interface Car {
  license_plate: string;
  make: string;
  model: string;
  model_year: number;
  color: string;
  fuel_type: string;
  vin: string;
  reg_date: number;
  drivetrain: string;
  warranty: string;
}

export async function getAllCars(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/cars`, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching cars:", error);
    throw new Error("Failed to fetch cars. Please try again later!");
  }
}

export async function createCar(car: Car) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/cars`,
      {
        ...car,
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating car:", error);
    throw new Error("Failed to create car. Please try again later!");
  }
}