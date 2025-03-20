import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newCustomerSchema";
import countries from "../constants/countries";
import { createCustomer } from "../services/customerService";

export default function NewCustomer() {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      customer_address_1: "",
      customer_address_2: "",
      customer_address_3: "",
      customer_address_4: "",
      customer_tax_number: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting values:", values);
      try {
        const response = await createCustomer(values);
        if (!response) {
          console.error("An error occurred during data upload.");
        } else {
          resetForm();
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Add new customer</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="firstName" className="mt-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.first_name && !!formik.errors.first_name
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.first_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.last_name && !!formik.errors.last_name
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.last_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phoneNumber" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.phone_number && !!formik.errors.phone_number
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phone_number}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="taxNumber" className="mt-3">
              <Form.Label>Tax Number</Form.Label>
              <Form.Control
                type="text"
                name="customer_tax_number"
                value={formik.values.customer_tax_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customer_tax_number &&
                  !!formik.errors.customer_tax_number
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_tax_number}
              </Form.Control.Feedback>
            </Form.Group>

            <h4 className="mt-4">Address</h4>

            <Form.Group controlId="zipcode" className="mt-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                name="customer_address_2"
                value={formik.values.customer_address_2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customer_address_2 &&
                  !!formik.errors.customer_address_2
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_address_2}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                as="select"
                name="customer_address_1"
                value={formik.values.customer_address_1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customer_address_1 &&
                  !!formik.errors.customer_address_1
                }
              >
                <option value="">Select a country...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_address_1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="customer_address_3"
                value={formik.values.customer_address_3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customer_address_3 &&
                  !!formik.errors.customer_address_3
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_address_3}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="streetAddress" className="mt-3">
              <Form.Label>Street & House Number</Form.Label>
              <Form.Control
                type="text"
                name="customer_address_4"
                value={formik.values.customer_address_4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customer_address_4 &&
                  !!formik.errors.customer_address_4
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.customer_address_4}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Add new customer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
