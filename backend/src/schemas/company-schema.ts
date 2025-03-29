import * as Yup from "yup";

const createCompanySchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "The company name must be at least 2 characters long!")
    .required("Please enter the company name!"),
  company_tax_number: Yup.string().required(
    "Please enter the company tax number!"
  ),
  contact_phone_number: Yup.string().required(
    "The company contact phone number is required!"
  ),
  reg_number: Yup.string().required(
    "Please enter the company registration number!"
  ),
  company_address_2: Yup.string()
    .matches(/^[0-9]+$/, "The ZIP code can only contain numbers!")
    .required("Please enter the company ZIP code!"),
  company_address_1: Yup.string().required("Please select a country!"),
  company_address_3: Yup.string().required("Please enter the city!"),
  company_address_4: Yup.string().required(
    "Please enter the street and house number!"
  ),
});

export default createCompanySchema;
