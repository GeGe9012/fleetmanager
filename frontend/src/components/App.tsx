import ResizableTable from "./ResizableTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { FaSort } from "react-icons/fa";
import {
  tableHeadsCars,
  tableHeadsCustomers,
  tableHeadsCompanies,
} from "../constants/tableheads";
import { getAllCars } from "../services/carService";
import { getAllCustomers } from "../services/customerService";
import { getAllCompanies } from "../services/companyService";

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
  [key: string]: string | number | boolean;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_address_3: string;
  customer_address_4: string;
  contract: string;
  customer_tax_number: string;
  [key: string]: string;
}

interface Company {
  id: string;
  company: string;
  company_tax_number: string;
  contact_phone_number: string;
  reg_number: string;
  company_address_1: string;
  company_address_2: string;
  company_address_3: string;
  company_address_4: string;
  [key: string]: string;
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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<{
    search: { [key: string]: string };
  }>({ search: {} });

  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    if (!searchTriggered) return;
    const isSearchEmpty = Object.keys(queryParams.search).length === 0;

    setLoading(true);
    if (activeTab === "fleet") {
      getAllCars(isSearchEmpty ? undefined : queryParams.search)
        .then(setCars)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (activeTab === "customers") {
      getAllCustomers(isSearchEmpty ? undefined : queryParams.search)
        .then(setCustomers)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (activeTab === "companies") {
      getAllCompanies(isSearchEmpty ? undefined : queryParams.search)
        .then(setCompanies)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
    setSearchTriggered(false);
    setQueryParams({ search: {} });
  }, [activeTab, queryParams, searchTriggered]);

  const sortData = <T extends Record<string, string | number | boolean>>(
    data: T[],
    key: keyof T | null,
    direction: "asc" | "desc"
  ) => {
    if (!key) return data;

    return [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  };

  const columnKeyMap: { [key: string]: string } = {
    "License Plate": "license_plate",
    Make: "make",
    Model: "model",
    "Model Year": "model_year",
    Color: "color",
    Fuel: "fuel_type",
    VIN: "vin",
    "Registration Date": "reg_date",
    Drivetrain: "drivetrain",
    Warranty: "warranty",
    Company: "company",
    Contract: "contract",
    "Contract duration": "contract_dur",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Company Name": "company",
    "Phone Number": "phone_number",
    "E-mail": "email",
    Address: "customer_address_1",
    "Tax Number": "customer_tax_number",
    "Company Tax Number": "company_tax_number",
    "Company Address": "company_address_1",
    "Company Phone Number": "contact_phone_number",
    "Registration Number": "reg_number",
  };

  const columnKeyMapFleet: { [key: number]: string } = {
    0: "license_plate",
    1: "make",
    2: "model",
    3: "model_year",
    4: "color",
    5: "fuel_type",
    6: "vin",
    7: "reg_date",
    8: "drivetrain",
    9: "warranty",
    10: "company",
    11: "contract",
    12: "contract_dur",
  };

  const columnKeyMapCustomers: { [key: string]: string } = {
    0: "first_name",
    1: "last_name",
    2: "company",
    3: "phone_number",
    4: "email",
    5: "customer_address_1",
    6: "contract",
    7: "license_plate",
    8: "customer_tax_number",
  };

  const columnKeyMapCompanies: { [key: string]: string } = {
    0: "company",
    1: "company_tax_number",
    2: "contact_phone_number",
    3: "reg_number",
    4: "company_address_1",
  };

  const handleSort = (column: string) => {
    const key = columnKeyMap[column];
    if (!key) return;

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCars = sortData<Car>(
    cars,
    sortConfig.key as keyof Car,
    sortConfig.direction
  );
  const sortedCustomers = sortData<Customer>(
    customers,
    sortConfig.key as keyof Customer,
    sortConfig.direction
  );
  const sortedCompanies = sortData<Company>(
    companies,
    sortConfig.key as keyof Company,
    sortConfig.direction
  );

  return (
    <>
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
                    {tableHeadsCars.map((column) => (
                      <th
                        key={column}
                        style={{ ...thStyle, cursor: "pointer" }}
                        onClick={() => handleSort(column)}
                      >
                        <span>{column}</span>
                        <FaSort />
                      </th>
                    ))}
                  </tr>
                  <SearchBar
                    SearchBarSum={13}
                    queryParams={queryParams}
                    columnKeyForSearchBar={columnKeyMapFleet}
                    setQueryParams={setQueryParams}
                    setSearchTriggered={setSearchTriggered}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {sortedCars.map((car, index) => (
                    <tr key={car.id}>
                      <td>{index + 1}</td>
                      <td>{car.license_plate}</td>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.model_year}</td>
                      <td>{car.color}</td>
                      <td>{car.fuel_type}</td>
                      <td>{car.vin}</td>
                      <td>{car.reg_date}</td>
                      <td>{car.drivetrain}</td>
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
                    {tableHeadsCustomers.map((column) => (
                      <th
                        key={column}
                        style={{ ...thStyle, cursor: "pointer" }}
                        onClick={() => handleSort(column)}
                      >
                        <span>{column}</span>
                        <FaSort />
                      </th>
                    ))}
                  </tr>
                  <SearchBar
                    SearchBarSum={9}
                    queryParams={queryParams}
                    columnKeyForSearchBar={columnKeyMapCustomers}
                    setQueryParams={setQueryParams}
                    setSearchTriggered={setSearchTriggered}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {sortedCustomers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.company}</td>
                      <td>{customer.phone_number}</td>
                      <td>{customer.email}</td>
                      <td>
                        <>
                          {customer.customer_address_1}{" "}
                          {customer.customer_address_2} <br />
                        </>

                        <>
                          {customer.customer_address_3}{" "}
                          {customer.customer_address_4}
                        </>
                      </td>
                      <td>{customer.contract}</td>
                      <td>{customer.license_plate}</td>
                      <td>{customer.customer_tax_number}</td>
                    </tr>
                  ))}
                </tbody>
              </ResizableTable>
            </Tab>
            <Tab eventKey="companies" title="Companies">
              <ResizableTable
                resizable={true}
                resizeOptions={{}}
                activeTab={activeTab}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    {tableHeadsCompanies.map((column) => (
                      <th
                        key={column}
                        style={{ ...thStyle, cursor: "pointer" }}
                        onClick={() => handleSort(column)}
                      >
                        <span>{column}</span>
                        <FaSort />
                      </th>
                    ))}
                  </tr>
                  <SearchBar
                    SearchBarSum={5}
                    queryParams={queryParams}
                    columnKeyForSearchBar={columnKeyMapCompanies}
                    setQueryParams={setQueryParams}
                    setSearchTriggered={setSearchTriggered}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {sortedCompanies.map((company, index) => (
                    <tr key={company.id}>
                      <td>{index + 1}</td>
                      <td>{company.company}</td>
                      <td>{company.company_tax_number}</td>
                      <td>{company.contact_phone_number}</td>
                      <td>{company.reg_number}</td>
                      <td>
                        <>
                          {company.company_address_1}{" "}
                          {company.company_address_2} <br />
                        </>

                        <>
                          {company.company_address_3}{" "}
                          {company.company_address_4}
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ResizableTable>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}
