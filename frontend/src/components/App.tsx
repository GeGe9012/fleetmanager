import ResizableTable from "./ResizableTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { FaSort } from "react-icons/fa";
import { tableHeadsCars, tableHeadsCustomers } from "../constants/tableheads";
import { getAllCars } from "../services/carService";

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
  address_1: string;
  address_2: string;
  address_3: string;
  contract: string;
  tax_nubmer: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [queryParams, setQueryParams] = useState<{
    search: { [index: number]: string };
    page: number;
  } | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // console.log(queryParams); ////////////////////////////////

  // Backend hívás az autók adatainak lekérésére
  useEffect(() => {
    if (activeTab === "fleet") {
      setLoading(true);
      getAllCars()
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [activeTab]);
  ////////////////////////////////////
  console.log(cars)

  const sortData = (
    data: Car[] | Customer[],
    key: string | null,
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
    "Make": "make",
    "Model": "model",
    "Model Year": "model_year",
    "Color": "color",
    "Fuel": "fuel_type",
    "VIN": "vin",
    "Registration Date": "reg_date",
    "Drivetrain": "drivetrain",
    "Warranty": "warranty",
    "Company": "company",
    "Contract": "contract",
    "Contract duration": "contract_dur",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Company Name": "company",
    "Phone Number": "phone_number",
    "E-mail": "email",
    "Address": "address_1",
    "Tax Number": "tax_nubmer",
  };

  const handleSort = (column: string) => {
    const key = columnKeyMap[column];
    if (!key) return;

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCars = sortData(cars, sortConfig.key, sortConfig.direction);
  const sortedCustomers = sortData(
    customers,
    sortConfig.key,
    sortConfig.direction
  );

  useEffect(() => {
    setQueryParams(null);
  }, [activeTab]);

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
                    setQueryParams={setQueryParams}
                  />
                </thead>
                <tbody style={{ padding: "2px", textAlign: "center" }}>
                  {sortedCars.map((car, index) => (
                    <tr key={car.id}>
                      <td>{index + 1}</td>
                      <td>{car.license_plate || "No data"}</td>
                      <td>{car.make || "No data"}</td>
                      <td>{car.model || "No data"}</td>
                      <td>{car.model_year || "No data"}</td>
                      <td>{car.color || "No data"}</td>
                      <td>{car.fuel_type || "No data"}</td>
                      <td>{car.vin || "No data"}</td>
                      <td>{car.reg_date || "No data"}</td>
                      <td>{car.drivetrain || "No data"}</td>
                      <td>{car.warranty ? new Date(car.warranty).toISOString().split("T")[0].replace(/-/g, ".") : "No data"}</td>
                      <td>{car.company || "No data"}</td>
                      <td>{car.contract || "No data"}</td>
                      <td>{car.contract_dur || "No data"}</td>
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
                    setQueryParams={setQueryParams}
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
                        {String(customer.address_1) +
                          String(customer.address_2) +
                          String(customer.address_3)}
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
    </>
  );
}
