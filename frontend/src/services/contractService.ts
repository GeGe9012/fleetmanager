import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Contract } from "../interfaces/serviceInterfaces";

export async function getAllContracts(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/contracts`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching contracts:", error);
    throw new Error("Failed to fetch contracts. Please try again later!");
  }
}

export async function createContract(contract: Contract) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/contracts`, {
      ...contract,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response?.data?.message;
        if (
          errorMessage &&
          errorMessage.includes("The car already has an active contract!")
        ) {
          console.error("The car already has an active contract:", error);
          throw error;
        }
      }
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}

export async function deleteContract(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting contract:", error);
    throw new Error("Failed to delete contract. Please try again later!");
  }
}
