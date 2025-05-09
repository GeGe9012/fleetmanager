export const columnKeyMap: { [key: string]: string } = {
  "License Plate": "license_plate",
  Make: "make",
  Model: "model",
  "Model Year": "model_year",
  Color: "color",
  Fuel: "fuel_type",
  VIN: "vin",
  "Registration Date": "reg_date",
  Drivetrain: "drivetrain",
  Warranty: "warranty",
  Company: "company",
  Contract: "contract_number",
  "Contract(s)": "contract_number",
  "License Plate(s)": "license_plate",
  "Contract Expiration Date": "contract_exp",
  "First Name": "first_name",
  "Last Name": "last_name",
  "Phone Number": "phone_number",
  "E-mail": "email",
  Address: "customer_address_1",
  "Tax Number": "customer_tax_number",
  "Company Tax Number": "company_tax_number",
  "Company Address": "company_address_1",
  "Company Phone Number": "contact_phone_number",
  "Registration Number": "reg_number",
};

export const columnKeyMapFleet: { [key: number]: string } = {
  0: "license_plate",
  1: "make",
  2: "model",
  3: "model_year",
  4: "color",
  5: "fuel_type",
  6: "vin",
  7: "reg_date",
  8: "drivetrain",
  9: "warranty",
  10: "company_name",
  11: "contract_number",
  12: "contract_exp",
};

export const columnKeyMapCustomers: { [key: string]: string } = {
  0: "first_name",
  1: "last_name",
  2: "company",
  3: "phone_number",
  4: "email",
  5: "customer_address_1",
  6: "contract",
  7: "license_plate",
  8: "customer_tax_number",
};

export const columnKeyMapCompanies: { [key: string]: string } = {
  0: "company",
  1: "company_tax_number",
  2: "contact_phone_number",
  3: "reg_number",
  4: "company_address_1",
};

export const columnKeyMapContracts: { [key: string]: string } = {
  0: "contract_number",
  1: "company_name",
  2: "customer_name",
  3: "license_plate",
  4: "contract_exp",
};
