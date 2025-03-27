export interface Car {
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
  contract?: Contract | null;
}

export interface Company {
  company: string;
  company_tax_number: string;
  contact_phone_number: string;
  reg_number: string;
  company_address_1: string;
  company_address_2: string;
  company_address_3: string;
  company_address_4: string;
}

export interface Customer {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_address_3: string;
  customer_address_4: string;
  customer_tax_number: string;
  contracts?: Contract[];
}

export interface Contract {
  license_plate: string;
  customer_name: string;
  company_name: string;
  contract_exp: string;
  car_id: string;
  customer_id: string;
  company_id: string;
}
