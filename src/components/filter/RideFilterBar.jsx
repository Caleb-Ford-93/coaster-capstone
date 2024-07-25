import { useState } from "react";
import "./FilterBar.css";
export const RideFilterBar = ({ setSearchInput }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchInput(searchTerm.toLowerCase());
  };

  return (
    <div className="search-bar">
      <label>
        Search Rides:
        <input
          type="search"
          className="search-input"
          placeholder="Search by Coaster"
          id="searchInput"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </label>
      <button className="btn-info search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
