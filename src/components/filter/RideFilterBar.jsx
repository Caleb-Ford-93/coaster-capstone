import { useState } from "react";

export const RideFilterBar = ({ setSearchInput }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchInput(searchTerm.toLowerCase());
  };

  return (
    <div className="search-bar">
      <label htmlFor="searchInput">Search Rides: </label>
      <input
        type="search"
        placeholder="Search by Coaster Name"
        id="searchInput"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button className="btn-info" onClick={handleSearch}>
        Go
      </button>
    </div>
  );
};
