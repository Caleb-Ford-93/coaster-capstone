import { useEffect, useState } from "react";
import { getRidesByUserId } from "../../services/rideService";
import { Ride } from "./Ride";
import "./Ride.css";
import { RideFilterBar } from "../filter/RideFilterBar";
import { Container, Row } from "react-bootstrap";
import { getParks } from "../../services/parkService";

export const MyRides = ({ currentUser }) => {
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [allParks, setAllParks] = useState([]);

  const getAndSetCurrentUserRides = () => {
    getRidesByUserId(currentUser.id).then((rides) => setAllRides(rides));
  };
  const getAndSetAllParks = () => {
    getParks().then((parks) => {
      setAllParks(parks);
    });
  };
  const filterRidesBySearchInput = () => {
    if (searchInput.filterOpt === "coaster") {
      const searchedRides = allRides.filter((ride) =>
        ride.coaster.name.toLowerCase().includes(searchInput.searchTerm)
      );
      setFilteredRides(searchedRides);
    } else if (searchInput.filterOpt === "park") {
      const searchedParks = allParks.filter((park) =>
        park.name.toLowerCase().includes(searchInput.searchTerm)
      );
      const searchedRides = allRides.filter((ride) => {
        return searchedParks.find((park) => {
          return park.id === ride.coaster.parkId;
        });
      });
      setFilteredRides(searchedRides);
    } else {
      setFilteredRides(allRides);
    }
  };

  useEffect(() => {
    getAndSetAllParks();
  }, []);

  useEffect(() => {
    getAndSetCurrentUserRides();
  }, [currentUser]);

  useEffect(() => {
    setFilteredRides(allRides);
  }, [allRides]);
  useEffect(() => {
    filterRidesBySearchInput();
  }, [searchInput]);
  return (
    <>
      <Container className="ride-container">
        <div className="filter-bar">
          <RideFilterBar setSearchInput={setSearchInput} />
        </div>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {filteredRides.map((ride) => {
            return (
              <Ride
                key={ride.id}
                currentUser={currentUser}
                ride={ride}
                getAndSetAllRides={getAndSetCurrentUserRides}
                searchInput={searchInput}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};
