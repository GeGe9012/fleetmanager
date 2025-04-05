import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function resetDatabase() {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/resetdb`);
    return response.data;
  } catch (error) {
    console.error("Failed to send reset database request.", error);
    throw new Error("Failed to reset database.");
  }
}
