import { useEffect, useState } from "react";
import { getRidesByUserId } from "../../services/rideService";
import { Ride } from "./Ride";

export const MyRides = ({ currentUser }) => {
  const [currentUserRides, setCurrentUserRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);

  const getAndSetCurrentUserRides = (userId) => {
    getRidesByUserId(userId).then((rides) => setCurrentUserRides(rides));
  };

  useEffect(() => {
    getAndSetCurrentUserRides(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    setFilteredRides(currentUserRides);
  }, [currentUserRides]);

  return (
    <div className="ride-container">
      {filteredRides.map((ride) => {
        return <Ride key={ride.id} ride={ride} />;
      })}
    </div>
  );
};
