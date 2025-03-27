import * as Yup from "yup";

const warrantyValidationSchema = Yup.object().shape({
  warranty: Yup.string()
    .matches(/^[1-9]\d*$/, "Warranty term must be a positive integer")
    .required("Please enter a warranty term!"),
});

export default warrantyValidationSchema;
