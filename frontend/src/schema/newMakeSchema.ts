import * as Yup from "yup";

const makeValidationSchema = Yup.object({
  make: Yup.string()
    .required("Car make is required")
    .min(2, "Car make must be at least 2 characters long")
    .max(50, "Car make cannot exceed 50 characters"),
});

export default makeValidationSchema;
