export interface Car {
  id: string;
  license_plate: string;
  make: string;
  model: string;
  model_year: string;
  color: string;
  fuel_type: string;
  vin: string;
  reg_date: string;
  drivetrain: string;
  warranty: string;
  contract?: Contract;
  [key: string]: string | number | Contract | undefined;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_address_3: string;
  customer_address_4: string;
  customer_tax_number: string;
  contract?: Contract;
  [key: string]: string | Contract | undefined;
}

export interface Company {
  id: string;
  company: string;
  company_tax_number: string;
  contact_phone_number: string;
  reg_number: string;
  company_address_1: string;
  company_address_2: string;
  company_address_3: string;
  company_address_4: string;
  contract?: Contract;
  [key: string]: string | Contract | undefined;
}

export interface Contract {
  id: string;
  contract_number: string;
  license_plate: string;
  customer_name: string;
  company_name: string;
  contract_exp: string;
  car_id: string;
  customer_id: string;
  company_id: string;
}

export interface Color {
  id: string;
  name: string;
}

export interface WarrantyTerm {
  id: string;
  name: string;
}

export interface CarMake {
  id: string;
  name: string;
}
