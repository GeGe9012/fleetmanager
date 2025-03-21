import axios from "axios";
import { BACKEND_URL } from "../constants/backend";
import { Customer } from "../interfaces/serviceInterfaces";

export async function getAllCustomers(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/customers`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching customers:", error);
    throw new Error("Failed to fetch customers. Please try again later!");
  }
}

export async function createCustomer(customer: Customer) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/customers`, {
      ...customer,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating customer:", error);
    throw new Error("Failed to create customer. Please try again later!");
  }
}

export async function deleteCustomer(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting customer:", error);
    throw new Error("Failed to delete customer. Please try again later!");
  }
}
