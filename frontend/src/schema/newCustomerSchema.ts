import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "The name must be at least 2 characters long!")
    .required("Please enter your first name!"),
  last_name: Yup.string()
    .min(2, "The last name must be at least 2 characters long!")
    .required("Please enter your last name!"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "The phone number can only contain numbers!")
    .required("Please enter your phone number!"),
  email: Yup.string()
    .email("Invalid email format!")
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Please enter a valid email address!")
    .required("Please enter your email address!"),
  customer_tax_number: Yup.string()
    .matches(/^[0-9]+$/, "The tax number can only contain numbers!")
    .required("Please enter your tax number!"),
  customer_address_2: Yup.string()
    .matches(/^[0-9]+$/, "The ZIP code can only contain numbers!")
    .required("Please enter your ZIP code!"),
  customer_address_1: Yup.string().required("Please select a country!"),
  customer_address_3: Yup.string().required("Please enter the city!"),
  customer_address_4: Yup.string().required(
    "Please enter the street and house number!"
  ),
});

export default validationSchema;
