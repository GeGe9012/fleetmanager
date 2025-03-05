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

  birth_date: Yup.date()
    .required("The birth date is required!")
    .typeError("Please enter a valid date!"),

  tax_number: Yup.string()
    .matches(/^[0-9]+$/, "The tax number can only contain numbers!")
    .required("Please enter your tax number!"),

  zipcode: Yup.string()
    .matches(/^[0-9]+$/, "The ZIP code can only contain numbers!")
    .required("Please enter your ZIP code!"),

  country: Yup.string().required("Please select a country!"),
  city: Yup.string().required("Please enter the city!"),
  street_address: Yup.string().required(
    "Please enter the street and house number!"
  ),
});

export default validationSchema;
