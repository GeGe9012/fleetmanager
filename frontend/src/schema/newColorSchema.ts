import * as Yup from "yup";

const colorValidationSchema = Yup.object().shape({
  color: Yup.string()
    .required("Car color is required")
    .min(2, "Car color must be at least 2 characters long")
    .max(50, "Car color cannot exceed 50 characters"),
});

export default colorValidationSchema;
