import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newDataSchema";
import { createData } from "../services/createData";
import carMakes from "../constants/carMakes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import colors from "../constants/colors";
import warrantyTerms from "../constants/warrantyTerms";
import companies from "../constants/companies";
import { useEffect } from "react";

export default function NewCar() {
  
  const formik = useFormik({
    initialValues: {
      license_plate: "",
      make: "",
      model: "",
      modelYear: null,
      color: "",
      fuelType: "",
      vin: "",
      regDate: null,
      drivetrain: "",
      warranty: "",
      company: "",
    },
    
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting values:", values); // Ellenőrizzük, hogy az értékek megjelennek-e
      
      try {
        const response = await createData(values);
        if (!response) {
          console.error("An error occurred during data upload.");
        } else {
          console.log("Data uploaded successfully!");
          resetForm();
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  });

  useEffect(() => {
    console.log("Current form values:", formik.values);
  }, [formik.values]);
  useEffect(() => {
    console.log("Formik Errors:", formik.errors);
    console.log("Formik isValid:", formik.isValid);
  }, [formik.errors, formik.isValid]);
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Add new car data</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="license_plate" className="mt-3">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                name="license_plate"
                value={formik.values.license_plate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.license_plate && !!formik.errors.license_plate
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.license_plate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Select
                name="make"
                value={formik.values.make}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.make && !!formik.errors.make}
              >
                <option value="">Choose a make...</option>
                {carMakes.map((make, index) => (
                  <option key={index} value={make}>
                    {make}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.make}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="model" className="mt-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.model && !!formik.errors.model}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="modelYear" className="mt-3">
              <Form.Label>Modell year</Form.Label>
              <DatePicker
                selected={formik.values.modelYear}
                onChange={(date) => formik.setFieldValue("modelYear", date)}
                showYearPicker
                dateFormat="yyyy"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
              {formik.touched.modelYear && formik.errors.modelYear && (
                <div className="text-danger">
                  {String(formik.errors.modelYear)}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Select
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.color && !!formik.errors.color}
              >
                <option value="">Choose a color...</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.color}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="fuelType" className="mt-3">
              <Form.Label>Fuel Type</Form.Label>
              {[
                "Petrol",
                "Diesel",
                "Hybrid-Petrol",
                "Hybrid-Diesel",
                "Electric",
              ].map((type) => (
                <Form.Check
                  key={type}
                  type="radio"
                  label={type}
                  name="fuelType"
                  value={type}
                  checked={formik.values.fuelType === type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.fuelType && !!formik.errors.fuelType
                  }
                />
              ))}
              <Form.Control.Feedback type="invalid">
                {formik.errors.fuelType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="vin" className="mt-3">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                name="vin"
                value={formik.values.vin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.vin && !!formik.errors.vin}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.vin}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="regDate" className="mt-3">
              <Form.Label>Registration Date</Form.Label>
              <DatePicker
                selected={formik.values.regDate}
                onChange={(date) => formik.setFieldValue("regDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              {formik.touched.regDate && formik.errors.regDate && (
                <div className="text-danger">
                  {String(formik.errors.regDate)}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="drivetrain" className="mt-3">
              <Form.Label>Drivetrain</Form.Label>
              {["RWD", "FWD", "AWD", "4WD"].map((type) => (
                <Form.Check
                  key={type}
                  type="radio"
                  label={type}
                  name="drivetrain"
                  value={type}
                  checked={formik.values.drivetrain === type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.drivetrain && !!formik.errors.drivetrain
                  }
                />
              ))}
              <Form.Control.Feedback type="invalid">
                {formik.errors.drivetrain}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="warranty">
              <Form.Label>Warranty</Form.Label>
              <Form.Select
                name="warranty"
                value={formik.values.warranty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.warranty && !!formik.errors.warranty}
              >
                <option value="">Choose warranty term...</option>
                {warrantyTerms.map((warranty, index) => (
                  <option key={index} value={warranty}>
                    {warranty}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.warranty}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Select
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.company && !!formik.errors.company}
              >
                <option value="">Choose company...</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.company}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Regisztráció
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
