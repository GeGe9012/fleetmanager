import { KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  SearchBarSum: number;
  queryParams: { search: { [index: number]: string }; page: number } | null;
  setQueryParams: (params: {
    search: { [index: number]: string };
    page: number;
  }) => void;
}

export default function SearchBar({
  SearchBarSum,
  queryParams,
  setQueryParams,
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

  const [searchValues, setSearchValues] = useState<string[]>(
    Array(SearchBarSum).fill("")
  );

  const handleSearch = (value: string, index: number) => {
    setQueryParams({
      search: {
        ...(queryParams?.search || {}), // Megőrizzük a korábbi értékeket
        [index]: value, // Frissítjük az adott indexű mezőt
      },
      page: 1, // Oldalt mindig visszaállítjuk az elsőre
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;

    // Frissítjük a searchValues állapotot
    const newValues = [...searchValues];
    newValues[index] = newValue;
    setSearchValues(newValues);

    // Lemásoljuk a queryParams.search objektumot
    const updatedSearch = { ...(queryParams?.search || {}) };

    if (newValue === "") {
      // Ha az input üres lett, töröljük a megfelelő indexet az objektumból
      delete updatedSearch[index];
    } else {
      // Egyébként frissítjük az értéket
      updatedSearch[index] = newValue;
    }

    // Beállítjuk a frissített queryParams-t
    setQueryParams({
      search: updatedSearch,
      page: 1, // Oldalt visszaállítjuk az elsőre
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      handleSearch(searchValues[index], index);
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
            value={queryParams?.search[index + 1]}
            onChange={(e) => handleChange(e, index + 1)}
            onKeyDown={(e) => handleKeyDown(e, index + 1)}
          />
        </th>
      ))}
    </tr>
  );
}
