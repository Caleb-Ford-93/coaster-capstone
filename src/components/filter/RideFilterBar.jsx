import { useState } from "react";
import "./FilterBar.css";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
export const RideFilterBar = ({ setSearchInput }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpt, setFilterOpt] = useState("");
  const handleSearch = () => {
    const searchObj = {
      filterOpt: filterOpt,
      searchTerm: searchTerm.toLowerCase(),
    };
    setSearchInput(searchObj);
  };
  const handleClick = (e) => {
    setFilterOpt(e);
  };

  return (
    <div className="search-bar">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {`Filter by ${filterOpt}`}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            id="park"
            onClick={(e) => {
              handleClick(e.target.id);
            }}
          >
            Filter by park
          </Dropdown.Item>
          <Dropdown.Item
            id="coaster"
            onClick={(e) => {
              handleClick(e.target.id);
            }}
          >
            Filter by coaster
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <input
        type="search"
        className="search-input"
        placeholder={`Enter ${filterOpt} name`}
        id="searchInput"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <Button variant="success" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
