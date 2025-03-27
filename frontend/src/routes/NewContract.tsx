import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newContractSchema";
import { getAllCars } from "../services/carService";
import { useEffect, useState } from "react";
import { getAllCompanies } from "../services/companyService";
import { getAllCustomers } from "../services/customerService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createContract } from "../services/contractService";
import axios from "axios";

export default function NewContract() {
  const [cars, setCars] = useState<{ id: string; license_plate: string }[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      license_plate: "",
      customer_name: "",
      company_name: "",
      contract_exp: "",
      car_id: "",
      customer_id: "",
      company_id: "",
    },

    validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const response = await createContract(values);
        if (!response) {
          console.error("An error occurred during data upload.");
        } else {
          resetForm();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data?.message?.includes("The car already has an active contract!")
          ) {
            setFieldError(
              "license_plate",
              "The car already has an active contract!"
            );
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
  });

  useEffect(() => {
    getAllCars()
      .then((cars) =>
        setCars(
          cars.map((car: { id: string; license_plate: string }) => ({
            id: car.id,
            license_plate: car.license_plate,
          }))
        )
      )
      .catch(console.error);

    getAllCompanies()
      .then((companies) =>
        setCompanies(
          companies.map((company: { id: string; company: string }) => ({
            id: company.id,
            name: company.company,
          }))
        )
      )
      .catch(console.error);

    getAllCustomers()
      .then((customers) =>
        setCustomers(
          customers.map((customer: { id: string; first_name: string; last_name: string }) => ({
            id: customer.id,
            name: `${customer.first_name} ${customer.last_name}`,
          }))
        )
      )
      .catch(console.error);
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Create New Contract</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="licensePlate">
              <Form.Label>Car</Form.Label>
              <Form.Select
                name="license_plate"
                value={formik.values.license_plate}
                onChange={(e) => {
                  const selectedCar = cars.find(car => car.license_plate === e.target.value);
                  formik.setFieldValue("license_plate", e.target.value);
                  formik.setFieldValue("car_id", selectedCar ? selectedCar.id : "");
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.license_plate && !!formik.errors.license_plate}
              >
                <option value="">Choose a car...</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.license_plate}>
                    {car.license_plate}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.license_plate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="companyName">
              <Form.Label>Company</Form.Label>
              <Form.Select
                name="company_name"
                value={formik.values.company_name}
                onChange={(e) => {
                  const selectedCompany = companies.find(company => company.name === e.target.value);
                  formik.setFieldValue("company_name", e.target.value);
                  formik.setFieldValue("company_id", selectedCompany ? selectedCompany.id : "");
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.company_name && !!formik.errors.company_name}
              >
                <option value="">Choose a company...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.company_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="customerName">
              <Form.Label>Customer</Form.Label>
              <Form.Select
                name="customer_name"
                value={formik.values.customer_name}
                onChange={(e) => {
                  const selectedCustomer = customers.find(customer => customer.name === e.target.value);
                  formik.setFieldValue("customer_name", e.target.value);
                  formik.setFieldValue("customer_id", selectedCustomer ? selectedCustomer.id : "");
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.customer_name && !!formik.errors.customer_name}
              >
                <option value="">Choose a customer...</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="contractExp" className="mt-3">
              <Form.Label>Contract Expiration Date</Form.Label>
              <DatePicker
                selected={
                  formik.values.contract_exp
                    ? new Date(formik.values.contract_exp)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "contract_exp",
                    date
                      ? date.toISOString().split("T")[0].replace(/-/g, ".")
                      : ""
                  )
                }
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              {formik.touched.contract_exp && formik.errors.contract_exp && (
                <div className="text-danger">
                  {String(formik.errors.contract_exp)}
                </div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Create new contract
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

