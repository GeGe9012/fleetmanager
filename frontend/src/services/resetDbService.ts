import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

export async function resetDatabase() {
  try {
    await axios.post(`${BACKEND_URL}/api/resetdb`);
  } catch (error) {
    console.error("Failed to send reset database request.", error);
    throw new Error("Failed to reset database.");
  }
}
