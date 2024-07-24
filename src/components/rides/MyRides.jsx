import { useEffect, useState } from "react";
import { getRidesByUserId } from "../../services/rideService";
import { Ride } from "./Ride";
import "./Ride.css";
import { RideFilterBar } from "../filter/RideFilterBar";

export const MyRides = ({ currentUser }) => {
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAndSetCurrentUserRides = () => {
    getRidesByUserId(currentUser.id).then((rides) => setAllRides(rides));
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
    getAndSetCurrentUserRides();
  }, [currentUser]);

  useEffect(() => {
    setFilteredRides(allRides);
  }, [allRides]);
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
      </div>
    </>
  );
};
