import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newCustomerSchema";
import { createData } from "../services/createData";
import DatePicker from "react-datepicker";
import countries from "../constants/countries";

export default function NewCustomer() {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      birth_date: null,
      tax_number: "",
      zipcode: "",
      country: "",
      city: "",
      street_address: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting values:", values);

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
                isInvalid={formik.touched.first_name && !!formik.errors.first_name}
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
                isInvalid={formik.touched.last_name && !!formik.errors.last_name}
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
                isInvalid={formik.touched.phone_number && !!formik.errors.phone_number}
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

            <Form.Group controlId="birthDate" className="mt-3">
              <Form.Label>Birth Date</Form.Label>
              <DatePicker
                selected={formik.values.birth_date}
                onChange={(date) => formik.setFieldValue("birth_date", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              {formik.touched.birth_date && formik.errors.birth_date && (
                <div className="text-danger">{String(formik.errors.birth_date)}</div>
              )}
            </Form.Group>

            <Form.Group controlId="taxNumber" className="mt-3">
              <Form.Label>Tax Number</Form.Label>
              <Form.Control
                type="text"
                name="tax_number"
                value={formik.values.tax_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.tax_number && !!formik.errors.tax_number}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.tax_number}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Address Fields */}
            <h4 className="mt-4">Address</h4>

            <Form.Group controlId="zipcode" className="mt-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.zipcode && !!formik.errors.zipcode}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.zipcode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                as="select"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.country && !!formik.errors.country}
              >
                <option value="">Select a country...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.city && !!formik.errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="streetAddress" className="mt-3">
              <Form.Label>Street & House Number</Form.Label>
              <Form.Control
                type="text"
                name="street_address"
                value={formik.values.street_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.street_address && !!formik.errors.street_address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.street_address}
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
