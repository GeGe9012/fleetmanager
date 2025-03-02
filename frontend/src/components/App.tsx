import ResizableTable from "./ResizableTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import carsData from "../constants/cars.json";
import customersData from "../constants/customers.json";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

interface Car {
  id: string;
  license_plate: string;
  make: string;
  model: string;
  model_year: number;
  color: string;
  fuel_type: boolean;
  vin: string;
  reg_date: number;
  drivetrain: boolean;
  warranty: string;
  company: string;
  contract: string;
  contract_dur: string;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  email: string;
  address_1: string;
  address_2: string;
  address_3: string;
  contract: string;
  license_plate: string;
  tax_nubmer: string;
}

export default function App() {
  const thStyle: object = {
    overflow: "hidden",
    textAlign: "center",
    verticalAlign: "middle",
    backgroundColor: "#555555",
    color: "white",
  };

  const [activeTab, setActiveTab] = useState<string>("fleet");
  const [cars, setCars] = useState<Car[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [queryParams, setQueryParams] = useState<{
    search: { [index: number]: string };
    page: number;
  } | null>(null);

  const navigate = useNavigate();

  console.log(queryParams);
  //-------------------------------------
  // Szimulált aszinkron adatbetöltés
  useEffect(() => {
    setLoading(true);
    setCars([]);
    setCustomers([]);
    setTimeout(() => {
      setCars(carsData);
      setCustomers(customersData);
      setLoading(false);
    }, 2000); // 2 másodperces késleltetés a szimulációhoz
  }, [activeTab]);
  //------------------------------------

  useEffect(() => {
    setQueryParams(null);
  }, [activeTab]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
      }}
    >
      <h1
        className="display-4 text-center"
        style={{ fontWeight: "bold", margin: "1rem" }}
      >
        The Fleet Manager
      </h1>
      <div className="d-flex flex-row gap-4">
        <Button variant="primary" size="lg" onClick={() => navigate("/newcar")}>
          Add new car
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/newcustomer")}
        >
          Add new customer
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/newcompany")}
        >
          Add new company
        </Button>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: "3rem",
          }}
        >
          <Spinner
            animation="border"
            style={{
              width: "5rem",
              height: "5rem",
              borderWidth: "0.5rem",
              borderStyle: "dotted",
              animationDuration: "1.5s",
            }}
          />
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Loading...
          </span>
        </div>
      ) : (
        <div>
          <Tabs
            defaultActiveKey={activeTab}
            id="justify-tab-example"
            className="mb-3"
            onSelect={(key) => setActiveTab(key ?? "fleet")}
            justify
          >
            <Tab eventKey="fleet" title="Fleet">
              <ResizableTable
                resizable={true}
                resizeOptions={{}}
                activeTab={activeTab}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Licence Plate</th>
                    <th style={thStyle}>Make</th>
                    <th style={thStyle}>Model</th>
                    <th style={thStyle}>Model Year</th>
                    <th style={thStyle}>Color</th>
                    <th style={thStyle}>Fuel</th>
                    <th style={thStyle}>VIN</th>
                    <th style={thStyle}>Registration Date</th>
                    <th style={thStyle}>Drivetrain</th>
                    <th style={thStyle}>Warranty</th>
                    <th style={thStyle}>Company</th>
                    <th style={thStyle}>Contract</th>
                    <th style={thStyle}>Contract duration</th>
                  </tr>
                  <SearchBar
                    SearchBarSum={13}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {cars.map((car, index) => (
                    <tr key={car.id}>
                      <td>{index + 1}</td>
                      <td>{car.license_plate}</td>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.model_year}</td>
                      <td>{car.color}</td>
                      <td>{car.fuel_type ? "Diesel" : "Petrol"}</td>
                      <td>{car.vin}</td>
                      <td>{car.reg_date}</td>
                      <td>{car.drivetrain ? "AWD/FWD" : "FWD"}</td>
                      <td>{car.warranty}</td>
                      <td>{car.company}</td>
                      <td>{car.contract}</td>
                      <td>{car.contract_dur}</td>
                    </tr>
                  ))}
                </tbody>
              </ResizableTable>
            </Tab>

            <Tab eventKey="customers" title="Customers">
              <ResizableTable
                resizable={true}
                resizeOptions={{}}
                activeTab={activeTab}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>First Name</th>
                    <th style={thStyle}>Last Name</th>
                    <th style={thStyle}>Company</th>
                    <th style={thStyle}>Phone Number</th>
                    <th style={thStyle}>E-mail</th>
                    <th style={thStyle}>Address</th>
                    <th style={thStyle}>Contract</th>
                    <th style={thStyle}>License Plate</th>
                    <th style={thStyle}>Tax Number</th>
                  </tr>
                  <SearchBar
                    SearchBarSum={9}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.company}</td>
                      <td>{customer.phone_number}</td>
                      <td>{customer.email}</td>
                      <td>
                        {customer.address_1 +
                          customer.address_2 +
                          customer.address_3}
                      </td>
                      <td>{customer.contract}</td>
                      <td>{customer.license_plate}</td>
                      <td>{customer.tax_nubmer}</td>
                    </tr>
                  ))}
                </tbody>
              </ResizableTable>
            </Tab>
          </Tabs>
        </div>
      )}
    </main>
  );
}
