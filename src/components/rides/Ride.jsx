import { useEffect, useState } from "react";
import { getParkById } from "../../services/parkService";
import "./Ride.css";

export const Ride = ({ ride }) => {
  const [rideLocation, setRideLocation] = useState({});

  const getAndSetRideLocation = (parkId) => {
    getParkById(parkId).then((park) => {
      setRideLocation(park);
    });
  };

  useEffect(() => {
    getAndSetRideLocation(ride.coaster.parkId);
  }, [ride]);
  return (
    <section className="ride-card">
      <img className="ride-img" src={`${ride.coaster.imgUrl}`} />
      <div className="ride-info">
        <h3 className="ride-name">{ride.coaster.name}</h3>
        <p>{rideLocation[0]?.name}</p>
        <p>{rideLocation[0]?.location}</p>
        <div className="ride-options">
          {/* <div className="ride-day-night"> */}
          {ride.dayRide ? <span>Day Ride ✅</span> : <span>Day Ride</span>}
          {ride.nightRide ? (
            <span>Night Ride ✅</span>
          ) : (
            <span>Night Ride</span>
          )}
          {/* </div> */}
          {/* <div className="ride-front-back"> */}
          {ride.frontRow ? <span>Front Row ✅</span> : <span>Front Row</span>}
          {ride.backRow ? <span>Back Row ✅</span> : <span>Back Row</span>}
          {/* </div> */}
        </div>
        <div className="ride-buttons">
          <button className="edit-btn btn btn-info">Edit</button>
          <button className="delete-btn btn btn-warning">Delete</button>
        </div>
      </div>
    </section>
  );
};
