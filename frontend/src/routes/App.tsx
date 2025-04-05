import ResizableTable from "../components/ResizableTable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { FaSort } from "react-icons/fa";
import {
  tableHeadsCars,
  tableHeadsCustomers,
  tableHeadsCompanies,
} from "../constants/tableheads";
import { deleteCar, getAllCars } from "../services/carService";
import { deleteCustomer, getAllCustomers } from "../services/customerService";
import { deleteCommpany, getAllCompanies } from "../services/companyService";
import {
  columnKeyMap,
  columnKeyMapCompanies,
  columnKeyMapCustomers,
  columnKeyMapFleet,
} from "../constants/columnKeyMaps";
import { Car, Company, Customer, Contract } from "../interfaces/appInterfaces";
import UpdateModal from "../components/UpdateModal";
import GreetingsModal from "../components/GreetingsModal";

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
  const [updateModalShow, setUpdateModalShow] = useState<boolean>(false);
  const [editData, setEditData] = useState<Car | Customer | Company | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [modalShow, setModalShow] = useState<boolean>(true);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortData = <T extends Record<string, any>>(
    data: T[],
    key: keyof T | null,
    direction: "asc" | "desc"
  ) => {
    if (!key) return data;

    return [...data].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      if (activeTab === "fleet") {
        if (key === "contract_number" || key === "contract_exp") {
          valA = a.contract?.[key] ?? "";
          valB = b.contract?.[key] ?? "";
        }

        if (key === "company") {
          valA = a.contract?.company_name ?? "";
          valB = b.contract?.company_name ?? "";
        }
      } else if (activeTab === "customers") {
        if (key === "company") {
          valA = a.contracts?.[0]?.company_name ?? "";
          valB = b.contracts?.[0]?.company_name ?? "";
        }

        if (key === "contract_number" || key === "license_plate") {
          valA = a.contracts?.[0]?.[key] ?? "";
          valB = b.contracts?.[0]?.[key] ?? "";
        }
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
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

  function handleDelete(id: string) {
    setLoading(true);

    if (activeTab === "fleet") {
      deleteCar(id)
        .then(() => {
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (activeTab === "customers") {
      deleteCustomer(id)
        .then(() => {
          setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.id !== id)
          );
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (activeTab === "companies") {
      deleteCommpany(id)
        .then(() => {
          setCompanies((prevCompanies) =>
            prevCompanies.filter((company) => company.id !== id)
          );
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }

  function handleUpdate(id: string) {
    const dataToEdit =
      activeTab === "fleet"
        ? cars.find((car) => car.id === id)
        : activeTab === "customers"
          ? customers.find((customer) => customer.id === id)
          : companies.find((company) => company.id === id);

    if (dataToEdit) {
      setEditData(dataToEdit);
      setUpdateModalShow(true);
    } else {
      console.error("Data not found");
    }
  }

  function isCar(data: Car | Company | Customer): data is Car {
    return (data as Car).license_plate !== undefined;
  }

  function isCustomer(data: Car | Company | Customer): data is Customer {
    return (data as Customer).customer_tax_number !== undefined;
  }

  function isCompany(data: Car | Company | Customer): data is Company {
    return (data as Company).company_tax_number !== undefined;
  }

  function handleSave(updatedData: Car | Company | Customer) {
    setUpdateModalShow(false);

    if (activeTab === "fleet" && isCar(updatedData)) {
      const updatedCar: Car = {
        ...updatedData,
        contract: updatedData.contract
          ? updatedData.contract
          : updatedData.contract,
      };
      setCars((prev) =>
        prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
    } else if (activeTab === "customers" && isCustomer(updatedData)) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === updatedData.id ? updatedData : customer
        )
      );
    } else if (activeTab === "companies" && isCompany(updatedData)) {
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === updatedData.id ? updatedData : company
        )
      );
    }
  }
  return (
    <>
      <GreetingsModal show={modalShow} onHide={() => setModalShow(false)} />
      <UpdateModal
        show={updateModalShow}
        handleClose={() => setUpdateModalShow(false)}
        data={editData ?? ({} as Car | Customer | Company)}
        handleSave={handleSave}
        activeTab={activeTab}
      />
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
                    <th style={thStyle}>Actions</th>
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
                    <tr style={{ textTransform: "capitalize" }} key={car.id}>
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
                      <td>{car.warranty} months</td>
                      <td>
                        {(car.contract as unknown as Contract)?.company_name ??
                          ""}
                      </td>
                      <td>
                        {(car.contract as unknown as Contract)
                          ?.contract_number ?? ""}
                      </td>
                      <td>
                        {(car.contract as unknown as Contract)?.contract_exp ??
                          ""}
                      </td>
                      <td className="p-0 align-middle">
                        <div className="d-flex">
                          <Button
                            variant="success"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleUpdate(car.id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleDelete(car.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
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
                    <th style={thStyle}>Actions</th>
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
                      <td>
                        {Array.isArray(customer.contracts) &&
                        customer.contracts.length > 0
                          ? customer.contracts[0].company_name
                          : ""}
                      </td>
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
                      <td>
                        {Array.isArray(customer.contracts)
                          ? customer.contracts
                              .map((contract) => contract.contract_number)
                              .join(", ")
                          : ""}
                      </td>
                      <td>
                        {Array.isArray(customer.contracts)
                          ? customer.contracts
                              .map((contract) => contract.license_plate)
                              .join(", ")
                          : ""}
                      </td>
                      <td>{customer.customer_tax_number}</td>
                      <td className="p-0 align-middle">
                        <div className="d-flex">
                          <Button
                            variant="success"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleUpdate(customer.id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleDelete(customer.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
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
                    <th style={thStyle}>Actions</th>
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
                      <td className="p-0 align-middle">
                        <div className="d-flex">
                          <Button
                            variant="success"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleUpdate(company.id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-grow-1 rounded-0"
                            onClick={() => handleDelete(company.id)}
                          >
                            Delete
                          </Button>
                        </div>
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
