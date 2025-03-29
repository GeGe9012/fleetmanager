import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { updateCar } from "../services/carService";
import carValidationSchema from "../schema/newCarSchema";
import customerValidationSchema from "../schema/newCustomerSchema";
import companyValidationSchema from "../schema/newCompanySchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { getAllColors } from "../services/colorService";
import { getAllWarranties } from "../services/warrantyService";
import { getAllMakes } from "../services/makeService";
import {
  Car,
  CarMake,
  Color,
  Company,
  Customer,
  WarrantyTerm,
} from "../interfaces/appInterfaces";
import countries from "../constants/countries";
import { updateCustomer } from "../services/customerService";
import { updateCompany } from "../services/companyService";

type DataType = Car | Customer | Company;

interface UpdateModalProps {
  show: boolean;
  handleClose: () => void;
  data: DataType;
  handleSave: (response: DataType) => void;
  activeTab: string;
}

export default function UpdateModal({
  show,
  handleClose,
  data,
  handleSave,
  activeTab,
}: UpdateModalProps) {
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

  const getInitialValues = () => {
    if (activeTab === "fleet") {
      return {
        license_plate: data?.license_plate || "",
        make: data?.make || "",
        model: data?.model || "",
        model_year: data?.model_year || 0,
        color: data?.color || "",
        fuel_type: data?.fuel_type || "",
        vin: data?.vin || "",
        reg_date: data?.reg_date || 0,
        drivetrain: data?.drivetrain || "",
        warranty: data?.warranty || "",
      };
    } else if (activeTab === "customers") {
      return {
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        phone_number: data?.phone_number || "",
        email: data?.email || "",
        customer_address_1: data?.customer_address_1 || "",
        customer_address_2: data?.customer_address_2 || "",
        customer_address_3: data?.customer_address_3 || "",
        customer_address_4: data?.customer_address_4 || "",
        customer_tax_number: data?.customer_tax_number || "",
      };
    } else if (activeTab === "companies") {
      return {
        company: data?.company || "",
        company_tax_number: data?.company_tax_number || "",
        contact_phone_number: data?.contact_phone_number || "",
        reg_number: data?.reg_number || "",
        company_address_1: data?.company_address_1 || "",
        company_address_2: data?.company_address_2 || "",
        company_address_3: data?.company_address_3 || "",
        company_address_4: data?.company_address_4 || "",
      };
    } else {
      return {};
    }
  };

  const getValidationSchema = () => {
    if (activeTab === "fleet") {
      return carValidationSchema;
    } else if (activeTab === "customers") {
      return customerValidationSchema;
    } else {
      return companyValidationSchema;
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let response;
        if (activeTab === "fleet") {
          response = await updateCar(values as Car, data?.id);
        } else if (activeTab === "customers") {
          response = await updateCustomer(values as Customer, data?.id);
        } else if (activeTab === "companies") {
          response = await updateCompany(values as Company, data?.id);
        }
        if (response) {
          handleSave(response);
          handleClose();
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          {activeTab === "fleet" && (
            <>
              <Form.Group controlId="licensePlate" className="mt-3">
                <Form.Label>License Plate</Form.Label>
                <Form.Control
                  type="text"
                  name="license_plate"
                  value={formik.values.license_plate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.license_plate &&
                    !!formik.errors.license_plate
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
                      ? new Date(Number(formik.values.model_year), 0, 1)
                      : null
                  }
                  onChange={(date) =>
                    formik.setFieldValue(
                      "model_year",
                      date ? date.getFullYear() : ""
                    )
                  }
                  showYearPicker
                  dateFormat="yyyy"
                />
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
                      date ? date.toISOString().split("T")[0] : ""
                    )
                  }
                  dateFormat="yyyy-MM-dd"
                />
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
                  isInvalid={
                    formik.touched.warranty && !!formik.errors.warranty
                  }
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
            </>
          )}
          {activeTab === "customers" && (
            <>
              <Form.Group controlId="firstName" className="mt-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={String(formik.values.first_name)}
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
                  value={String(formik.values.last_name)}
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
                  value={String(formik.values.phone_number)}
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
                  value={String(formik.values.email)}
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
                  value={String(formik.values.customer_tax_number)}
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

              <h6 className="mt-4">Address</h6>

              <Form.Group controlId="zipcode" className="mt-3">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  name="customer_address_2"
                  value={String(formik.values.customer_address_2)}
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
                  value={String(formik.values.customer_address_1)}
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
                  value={String(formik.values.customer_address_3)}
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
                  value={String(formik.values.customer_address_4)}
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
            </>
          )}

          {activeTab === "companies" && (
            <>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={String(formik.values.company)}
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
                  value={String(formik.values.company_tax_number)}
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
                  value={String(formik.values.contact_phone_number)}
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
                  value={String(formik.values.reg_number)}
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
              <h6 className="mt-4">Company address</h6>

              <Form.Group controlId="zipcode" className="mt-3">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  name="company_address_2"
                  value={String(formik.values.company_address_2)}
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
                  value={String(formik.values.company_address_1)}
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
                  value={String(formik.values.company_address_3)}
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
                  value={String(formik.values.company_address_4)}
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
            </>
          )}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
