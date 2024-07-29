import { useEffect, useState } from "react";
import { RideFilterBar } from "../filter/RideFilterBar";
import { Ride } from "./Ride";
import { getRides } from "../../services/rideService";
import { Container, Row } from "react-bootstrap";

export const DiscoverRides = ({ currentUser }) => {
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAndSetAllRides = () => {
    getRides().then((rides) => {
      setAllRides(rides);
    });
  };
  const filterRidesBySearchInput = () => {
    if (searchInput) {
      const searchedRides = allRides.filter((ride) =>
        ride.coaster.name.toLowerCase().includes(searchInput)
      );
      setFilteredRides(searchedRides);
    } else {
      setFilteredRides(allRides);
    }
  };
  useEffect(() => {
    getAndSetAllRides();
  }, []);
  useEffect(() => {
    const discoverRides = allRides.filter(
      (ride) => ride.userId != currentUser.id
    );
    setFilteredRides(discoverRides);
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
        <Row xs={1} lg={3} className="g-4">
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
