import { useEffect, useState } from "react";
import { RideFilterBar } from "../filter/RideFilterBar";
import { Ride } from "./Ride";
import { getRides } from "../../services/rideService";
import { Container, Row } from "react-bootstrap";
import { getParks } from "../../services/parkService";

export const DiscoverRides = ({ currentUser }) => {
  const [allRides, setAllRides] = useState([]);
  const [discoverRides, setDiscoverRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [allParks, setAllParks] = useState([]);

  const getAndSetAllRides = () => {
    getRides().then((rides) => {
      const sortedRides = rides.sort(
        (a, b) => new Date(b.lastRode) - new Date(a.lastRode)
      );
      setAllRides(sortedRides);
    });
  };
  const getAndSetAllParks = () => {
    getParks().then((parks) => {
      setAllParks(parks);
    });
  };
  const filterRidesBySearchInput = () => {
    if (searchInput.filterOpt === "coaster") {
      const searchedRides = discoverRides.filter((ride) =>
        ride.coaster.name.toLowerCase().includes(searchInput.searchTerm)
      );
      setFilteredRides(searchedRides);
    } else if (searchInput.filterOpt === "park") {
      const searchedParks = allParks.filter((park) =>
        park.name.toLowerCase().includes(searchInput.searchTerm)
      );
      const searchedRides = discoverRides.filter((ride) => {
        return searchedParks.find((park) => {
          return park.id === ride.coaster.parkId;
        });
      });
      setFilteredRides(searchedRides);
    } else {
      setFilteredRides(discoverRides);
    }
  };
  useEffect(() => {
    getAndSetAllParks();
  }, []);
  useEffect(() => {
    getAndSetAllRides();
  }, []);
  useEffect(() => {
    const otherUserRides = allRides.filter(
      (ride) => ride.userId != currentUser.id
    );
    setDiscoverRides(otherUserRides);
    setFilteredRides(otherUserRides);
  }, [allRides, currentUser]);

  useEffect(() => {
    filterRidesBySearchInput(searchInput);
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
                getAndSetAllRides={getAndSetAllRides}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};
