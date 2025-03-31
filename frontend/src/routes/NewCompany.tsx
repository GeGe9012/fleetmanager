import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newCompanySchema";
import countries from "../constants/countries";
import { createCompany } from "../services/companyService";

export default function NewCompany() {
  const formik = useFormik({
    initialValues: {
      company: "",
      company_tax_number: "",
      contact_phone_number: "",
      reg_number: "",
      company_address_1: "",
      company_address_2: "",
      company_address_3: "",
      company_address_4: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createCompany(values);
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
                name="contact_phone_number"
                value={formik.values.contact_phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.contact_phone_number &&
                  !!formik.errors.contact_phone_number
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.contact_phone_number}
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
                name="company_address_2"
                value={formik.values.company_address_2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.company_address_2 &&
                  !!formik.errors.company_address_2
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company_address_2}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                as="select"
                name="company_address_1"
                value={formik.values.company_address_1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.company_address_1 &&
                  !!formik.errors.company_address_1
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
                {formik.errors.company_address_1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="company_address_3"
                value={formik.values.company_address_3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.company_address_3 &&
                  !!formik.errors.company_address_3
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company_address_3}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="streetAddress" className="mt-3">
              <Form.Label>Street & House Number</Form.Label>
              <Form.Control
                type="text"
                name="company_address_4"
                value={formik.values.company_address_4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.company_address_4 &&
                  !!formik.errors.company_address_4
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company_address_4}
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
