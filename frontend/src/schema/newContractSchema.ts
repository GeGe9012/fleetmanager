import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  license_plate: Yup.string().required("Please select a car!"),
  company_name: Yup.string().required("Please select a company!"),
  customer_name: Yup.string().required("Please select a customer!"),
  contract_exp: Yup.date()
    .required("The registration date is required!")
    .typeError("Please enter a valid date!"),
});

export default validationSchema;
