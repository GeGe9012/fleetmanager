import { BACKEND_URL } from "../constants/backend";

export function resetDatabase() {
  const url = `${BACKEND_URL}/api/resetdb`;

  const success = navigator.sendBeacon(url);

  if (!success) {
    console.error("Failed to send reset database request.");
    throw new Error("Failed to reset database.");
  }
}
