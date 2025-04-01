import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useFormik } from "formik";
import { createMake, deleteMake, getAllMakes } from "../services/makeService";
import {
  createColor,
  deleteColor,
  getAllColors,
} from "../services/colorService";
import {
  createWarranty,
  deleteWarranty,
  getAllWarranties,
} from "../services/warrantyService";
import axios from "axios";
import colorValidationSchema from "../schema/newColorSchema";
import warrantyValidationSchema from "../schema/newWarrantySchema";
import { CarMake, Color, WarrantyTerm } from "../interfaces/appInterfaces";
import makeValidationSchema from "../schema/newMakeSchema";

export default function OtherTools() {
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
      warrantyTermsData.sort(
        (a: { name: string }, b: { name: string }) =>
          parseInt(a.name) - parseInt(b.name)
      );
      setColors(colorsData);
      setWarrantyTerms(warrantyTermsData);
      setCarMakes(carMakesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const colorFormik = useFormik({
    initialValues: { color: "" },
    validationSchema: colorValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        await createColor({ name: values.color });
        resetForm();
        loadData();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data?.message?.includes("Color already exists!")
          ) {
            setFieldError("color", "This color already exists!");
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
  });

  const warrantyFormik = useFormik({
    initialValues: { warranty: "" },
    validationSchema: warrantyValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        await createWarranty({ name: values.warranty });
        resetForm();
        loadData();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data?.message?.includes(
              "Warranty term already exists!"
            )
          ) {
            setFieldError("warranty", "This warranty term already exists!");
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
  });

  const makeFormik = useFormik({
    initialValues: { make: "" },
    validationSchema: makeValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        await createMake({ name: values.make });
        resetForm();
        loadData();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data?.message?.includes("Make already exists!")
          ) {
            setFieldError("make", "This make already exists!");
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
  });

  const handleDeleteColor = async (id: string) => {
    try {
      await deleteColor(id);
      loadData();
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  const handleDeleteWarranty = async (id: string) => {
    try {
      await deleteWarranty(id);
      loadData();
    } catch (error) {
      console.error("Error deleting warranty term:", error);
    }
  };

  const handleDeleteMake = async (id: string) => {
    try {
      await deleteMake(id);
      loadData();
    } catch (error) {
      console.error("Error deleting car make:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Manage Car Data</h2>
          <Card className="mt-4 border">
            <Card.Body>
              <Card.Title>Colors</Card.Title>
              <Table
                className="border"
                style={{ textTransform: "capitalize" }}
                hover
                borderless
              >
                <tbody>
                  {colors?.map((color) => (
                    <tr key={color.id}>
                      <td>{color.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteColor(color.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form noValidate onSubmit={colorFormik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="color"
                    value={colorFormik.values.color}
                    onChange={colorFormik.handleChange}
                    onBlur={colorFormik.handleBlur}
                    isInvalid={
                      colorFormik.touched.color && !!colorFormik.errors.color
                    }
                    placeholder="Add car color"
                  />
                  <Form.Control.Feedback type="invalid">
                    {colorFormik.errors.color}
                  </Form.Control.Feedback>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-2 w-100"
                  >
                    Add Color
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4 border">
            <Card.Body>
              <Card.Title>Warranty Terms</Card.Title>
              <Table className="border" hover borderless>
                <tbody>
                  {warrantyTerms?.map((warranty) => (
                    <tr key={warranty.id}>
                      <td>{warranty.name} months</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteWarranty(warranty.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form noValidate onSubmit={warrantyFormik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="warranty"
                    value={warrantyFormik.values.warranty}
                    onChange={warrantyFormik.handleChange}
                    isInvalid={
                      warrantyFormik.touched.warranty &&
                      !!warrantyFormik.errors.warranty
                    }
                    placeholder="Add warranty term"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {warrantyFormik.errors.warranty}
                  </Form.Control.Feedback>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-2 w-100"
                  >
                    Add Warranty
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4 border">
            <Card.Body>
              <Card.Title>Car Makes</Card.Title>
              <Table
                className="border"
                style={{ textTransform: "capitalize" }}
                hover
                borderless
              >
                <tbody>
                  {carMakes?.map((make) => (
                    <tr key={make.id}>
                      <td>{make.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteMake(make.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form noValidate onSubmit={makeFormik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="make"
                    value={makeFormik.values.make}
                    onChange={makeFormik.handleChange}
                    isInvalid={
                      makeFormik.touched.make && !!makeFormik.errors.make
                    }
                    placeholder="Add car make"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {makeFormik.errors.make}
                  </Form.Control.Feedback>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-2 w-100"
                  >
                    Add Make
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
