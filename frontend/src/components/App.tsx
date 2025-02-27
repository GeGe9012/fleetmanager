import ResizableTable from "./ResizableTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import cars from "../constants/cars.json";
import customers from "../constants/customers.json";
import { useState } from "react";

export default function App() {
  const thStyle = { overflow: "hidden", whiteSpace: "nowrap" };
  const [activeTab, setActiveTab] = useState<string | null>("fleet");

  return (
    <Tabs
      defaultActiveKey="fleet"
      id="justify-tab-example"
      className="mb-3"
      onSelect={(key) => setActiveTab(key)}
      justify
    >
      <Tab eventKey="fleet" title="Fleet">
        <ResizableTable resizable={true} resizeOptions={{}} activeTab={activeTab}>
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
        <ResizableTable resizable={true} resizeOptions={{}} activeTab={activeTab}>
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
                  {customer.address_1 + customer.address_2 + customer.address_3}
                </td>
                <td>{customer.contract}</td>
                <td>{customer.license_plate}</td>
                <td>{customer.tax_nubmer}</td>
              </tr>
            ))}
          </tbody>
        </ResizableTable>
      </Tab>
      <Tab eventKey="companies" title="Companies">
        <ResizableTable resizable={true} resizeOptions={{}} activeTab={activeTab}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>First Name</th>
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
    </Tabs>
  );
}
