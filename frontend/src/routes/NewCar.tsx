import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newCarSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCar } from "../services/carService";
import { useEffect, useState } from "react";
import { CarMake, Color, WarrantyTerm } from "../interfaces/appInterfaces";
import { getAllColors } from "../services/colorService";
import { getAllWarranties } from "../services/warrantyService";
import { getAllMakes } from "../services/makeService";
import axios from "axios";

export default function NewCar() {
  const [colors, setColors] = useState<Color[]>([]);
  const [warrantyTerms, setWarrantyTerms] = useState<WarrantyTerm[]>([]);
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const colorsData = await getAllColors();
      const warrantyTermsData = await getAllWarranties();
      const carMakesData = await getAllMakes();
      setColors(colorsData);
      setWarrantyTerms(warrantyTermsData);
      setCarMakes(carMakesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      license_plate: "",
      make: "",
      model: "",
      model_year: 0,
      color: "",
      fuel_type: "",
      vin: "",
      reg_date: 0,
      drivetrain: "",
      warranty: "",
    },

    validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const response = await createCar(values);
        if (!response) {
          console.error("An error occurred during data upload.");
        } else {
          resetForm();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data?.message?.includes("Car already exists!")
          ) {
            setFieldError(
              "license_plate",
              "This license plate already exists!"
            );
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Add new car data</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="licensePlate" className="mt-3">
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
                style={{ textTransform: "capitalize" }}
              >
                <option value="">Choose a make...</option>
                {carMakes?.map((make, index) => (
                  <option key={index} value={make.name}>
                    {make.name}
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
              <Form.Label>Model Year</Form.Label>
              <DatePicker
                selected={
                  formik.values.model_year
                    ? new Date(formik.values.model_year, 0, 1)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "model_year",
                    date ? date.getFullYear() : 0
                  )
                }
                showYearPicker
                dateFormat="yyyy"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
              {formik.touched.model_year && formik.errors.model_year && (
                <div className="text-danger">
                  {String(formik.errors.model_year)}
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
                style={{ textTransform: "capitalize" }}
              >
                <option value="">Choose a color...</option>
                {colors?.map((color, index) => (
                  <option key={index} value={color.name}>
                    {color.name}
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
                  name="fuel_type"
                  value={type}
                  checked={formik.values.fuel_type === type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.fuel_type && !!formik.errors.fuel_type
                  }
                />
              ))}
              <Form.Control.Feedback type="invalid">
                {formik.errors.fuel_type}
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
                selected={
                  formik.values.reg_date
                    ? new Date(formik.values.reg_date)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "reg_date",
                    date
                      ? date.toISOString().split("T")[0].replace(/-/g, ".")
                      : ""
                  )
                }
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              {formik.touched.reg_date && formik.errors.reg_date && (
                <div className="text-danger">
                  {String(formik.errors.reg_date)}
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
                {warrantyTerms?.map((warranty, index) => (
                  <option key={index} value={warranty.name}>
                    {warranty.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.warranty}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Add new car
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
