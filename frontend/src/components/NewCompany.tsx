import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newCompanySchema";
import { createData } from "../services/createData";
import countries from "../constants/countries";

export default function NewCompany() {
  const formik = useFormik({
    initialValues: {
      company: "",
      company_tax_number: "",
      phone_number: "",
      reg_number: "",
      zipcode: "",
      country: "",
      city: "",
      street_address: "",
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Add new company</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.company && !!formik.errors.company}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="companyTaxNumber" className="mt-3">
              <Form.Label>Tax Number</Form.Label>
              <Form.Control
                type="text"
                name="company_tax_number"
                value={formik.values.company_tax_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.company_tax_number &&
                  !!formik.errors.company_tax_number
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company_tax_number}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phoneNumber" className="mt-3">
              <Form.Label>Contact Phone Number</Form.Label>
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
            <Form.Group controlId="phoneNumber" className="mt-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="reg_number"
                value={formik.values.reg_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.reg_number && !!formik.errors.reg_number
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.reg_number}
              </Form.Control.Feedback>
            </Form.Group>
            <h4 className="mt-4">Company address</h4>

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
                isInvalid={
                  formik.touched.street_address &&
                  !!formik.errors.street_address
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.street_address}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Add new company
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
