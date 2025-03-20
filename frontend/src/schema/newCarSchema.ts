import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  license_plate: Yup.string().required("Please enter the license plate!"),
  make: Yup.string().required("Please select a car make!"),
  model: Yup.string().required("Please enter the car model!"),
  model_year: Yup.date()
    .required("The model year is required!")
    .typeError("Please enter a valid year!"),
  color: Yup.string().required("Please select a car color!"),
  fuel_type: Yup.string().required("Please select a fuel type!"),
  vin: Yup.string().required("Please enter the VIN!"),
  // reg_date: Yup.date()
  //   .required("The registration date is required!")
  //   .typeError("Please enter a valid date!"),
  drivetrain: Yup.string().required("Please select a drivetrain type!"),
  warranty: Yup.string().required("Please select the warranty details!"),
});

export default validationSchema;
