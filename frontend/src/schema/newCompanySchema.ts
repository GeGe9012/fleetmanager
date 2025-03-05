import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "The company name must be at least 2 characters long!")
    .required("Please enter the company name!"),
  company_tax_number: Yup.string()
    .required("Please enter the company tax number!")
    .matches(/^[0-9]+$/, "The tax number can only contain numbers!"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "The contact phone number can only contain numbers!")
    .required("The company contact phone number is required!"),
  reg_number: Yup.string()
    .required("Please enter the company registration number!")
    .matches(/^[0-9]+$/, "The registration number can only contain numbers!"),
  zipcode: Yup.string()
    .matches(/^[0-9]+$/, "The ZIP code can only contain numbers!")
    .required("Please enter the company ZIP code!"),
  country: Yup.string().required("Please select a country!"),
  city: Yup.string().required("Please enter the city!"),
  street_address: Yup.string().required(
    "Please enter the street and house number!"
  ),
});

export default validationSchema;
