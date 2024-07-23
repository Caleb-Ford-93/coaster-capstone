import { useEffect, useState } from "react";
import { getRidesByUserId } from "../../services/rideService";
import { Ride } from "./Ride";
import "./Ride.css";
import { RideFilterBar } from "../filter/RideFilterBar";

export const MyRides = ({ currentUser }) => {
  const [currentUserRides, setCurrentUserRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAndSetCurrentUserRides = (userId) => {
    getRidesByUserId(userId).then((rides) => setCurrentUserRides(rides));
  };
  const filterRidesBySearchInput = () => {
    if (searchInput) {
      const searchedRides = currentUserRides.filter((ride) =>
        ride.coaster.name.toLowerCase().includes(searchInput)
      );
      setFilteredRides(searchedRides);
    }
  };

  useEffect(() => {
    getAndSetCurrentUserRides(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    setFilteredRides(currentUserRides);
  }, [currentUserRides]);
  useEffect(() => {
    filterRidesBySearchInput(searchInput);
  }, [searchInput]);
  return (
    <>
      <div className="filter-bar">
        <RideFilterBar setSearchInput={setSearchInput} />
      </div>
      <div className="ride-container">
        {filteredRides.map((ride) => {
          return <Ride key={ride.id} ride={ride} />;
        })}
      </div>
    </>
  );
};
