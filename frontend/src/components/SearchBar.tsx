import { KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  SearchBarSum: number;
  queryParams: { search: { [key: string]: string } };
  columnKeyForSearchBar: { [key: number]: string };
  setQueryParams: (params: { search: { [key: string]: string }}) => void;
  setSearchTriggered: (value: boolean) => void;
}

export default function SearchBar({
  SearchBarSum,
  queryParams,
  columnKeyForSearchBar,
  setQueryParams,
  setSearchTriggered,
}: SearchBarProps) {
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

  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
    queryParams.search || {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const columnKey = columnKeyForSearchBar[index];
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
            value={searchValues[columnKeyForSearchBar[index]] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </th>
      ))}
      <th>
      </th>
    </tr>
  );
}
