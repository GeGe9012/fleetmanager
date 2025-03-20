import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

interface Customer {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_address_3: string;
  customer_address_4: string;
  customer_tax_number: string;
}

export async function getAllCustomers(queryParams = {}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/customers`, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching customers:", error);
    throw new Error("Failed to fetch customers. Please try again later!");
  }
}

export async function createCustomer(customer: Customer) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/customers`,
      {
        ...customer,
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating customer:", error);
    throw new Error("Failed to create customer. Please try again later!");
  }
}