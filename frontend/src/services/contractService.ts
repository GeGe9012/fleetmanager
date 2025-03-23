import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Contract } from "../interfaces/serviceInterfaces";

export async function createContract(contract: Contract) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/contracts`, {
      ...contract,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating contract:", error);
    throw new Error("Failed to create contract. Please try again later!");
  }
}
