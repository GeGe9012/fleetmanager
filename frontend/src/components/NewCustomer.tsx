import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import validationSchema from "../schema/newDataSchema";
import { createData } from "../services/createData";

export default function NewCustomer() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
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
          <h2 className="mb-4">Regisztrációs Űrlap</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            {/* Név */}
            <Form.Group controlId="name">
              <Form.Label>Név</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add meg a neved"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email cím</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email címed"
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

            {/* Jelszó */}
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                placeholder="Jelszavad"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Feltételek elfogadása
            <Form.Group controlId="terms" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Elfogadom a feltételeket"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.terms && !!formik.errors.terms}
                feedback={formik.errors.terms}
                feedbackType="invalid"
              />
            </Form.Group> */}

            {/* Küldés gomb */}
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Regisztráció
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
