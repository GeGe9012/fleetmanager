import { KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  SearchBarSum: number;
  queryParams: { search: { [key: string]: string } };
  setQueryParams: (params: { search: { [key: string]: string } }) => void;
  setSearchTriggered: (value: boolean) => void;
}

export default function SearchBar({ SearchBarSum, queryParams, setQueryParams, setSearchTriggered }: SearchBarProps) {
  const thStyle: React.CSSProperties = {
    padding: 0,
    height: "2.5rem",
    textAlign: "center",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    padding: "5px",
    boxSizing: "border-box",
    fontSize: "inherit",
  };

  // Oszlopokhoz kötött kulcsok
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
    12: "contract_dur"
  };

  const columnKeyMapCustomers: { [key: string]: string } = {
    1: "first_name",
    2: "last_name",
    3: "company",
    4: "phone_number",
    5: "email",
    6: "customer_address_1",
    7: "contract",
    8: "license_plate",
    9: "customer_tax_number",
  };

  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
    queryParams.search || {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const columnKey = columnKeyMapFleet[index];
    if (!columnKey) return;

    const newValue = e.target.value;

    setSearchValues((prev) => ({
      ...prev,
      [columnKey]: newValue,
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    const updatedSearchParams = Object.fromEntries(
      Object.entries(searchValues).filter(([, value]) => value.trim() !== "")
    );

    setQueryParams({ search: updatedSearchParams });
    setSearchTriggered(true);
  }
};

  return (
    <tr>
      <th style={thStyle}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FaSearch />
          Search...
        </div>
      </th>
      {Array.from({ length: SearchBarSum }).map((_, index) => (
        <th key={index} style={thStyle}>
          <input
            type="text"
            style={inputStyle}
            value={searchValues[columnKeyMapFleet[index]] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </th>
      ))}
    </tr>
  );
}
