import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getRidesByUserId } from "../../services/rideService";
import "./User.css";
export const UserInfoCard = ({ user, setUserStats, userStats }) => {
  const [coasterRides, setCoasterRides] = useState([]);
  const [uniqueParks, setUniqueParks] = useState(0);
  const getAndSetNumberOfCoasters = () => {
    getRidesByUserId(user?.id).then((rides) => {
      setCoasterRides(rides);
    });
  };
  const getAndSetNumberOfParks = () => {
    const differentParks = coasterRides
      .map((ride) => ride.coaster.parkId)
      .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueParks(differentParks.length);
  };
  const createAndSetUserStats = () => {
    const userStats = {
      coasterRides: coasterRides.length,
      uniqueParks: uniqueParks,
    };
    setUserStats(userStats);
  };
  useEffect(() => {
    getAndSetNumberOfCoasters();
  }, [user]);
  useEffect(() => {
    getAndSetNumberOfParks();
  }, [coasterRides]);
  useEffect(() => {
    createAndSetUserStats();
  }, [coasterRides, uniqueParks]);
  return (
    <Container className="profile-container">
      <Container className="user-info">
        <h2>Name: {user?.fullName}</h2>
        <h2>Favorite Coaster: {user?.favCoaster}</h2>
      </Container>
      <Container className="user-stats">
        <h1>Stats</h1>
        <h2>Different Coasters Ridden: {userStats.coasterRides}</h2>
        <h2>Different Parks Visited: {userStats.uniqueParks}</h2>
      </Container>
    </Container>
  );
};
