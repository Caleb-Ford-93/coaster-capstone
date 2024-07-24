import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRideById } from "../../services/rideService";
import { getParkById } from "../../services/parkService";

export const EditRideForm = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState({});
  const [park, setPark] = useState({});

  const getAndSetPark = (parkId) => {
    getParkById(parseInt(parkId)).then((park) => {
      setPark(park);
    });
  };
  useEffect(() => {
    getRideById(rideId).then((data) => {
      const rideObj = data[0];
      setRide(rideObj);
    });
  }, [rideId]);
  useEffect(() => {
    getAndSetPark(ride.coaster?.parkId);
  }, [ride]);
  return <h1>{ride?.coaster?.name}</h1>;
};
