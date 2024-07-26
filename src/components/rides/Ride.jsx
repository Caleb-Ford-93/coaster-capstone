import { useEffect, useState } from "react";
import { getParkById } from "../../services/parkService";
import "./Ride.css";
import { deleteRide } from "../../services/rideService";
import { useNavigate } from "react-router-dom";

export const Ride = ({ ride, currentUser, getAndSetAllRides }) => {
  const [rideLocation, setRideLocation] = useState({});

  const navigate = useNavigate();

  const getAndSetRideLocation = (parkId) => {
    getParkById(parkId).then((park) => {
      setRideLocation(park);
    });
  };

  const handleDelete = (id) => {
    deleteRide(id).then(() => {
      getAndSetAllRides();
    });
  };

  useEffect(() => {
    getAndSetRideLocation(ride.coaster.parkId);
  }, [ride]);
  return (
    <section className="ride-card">
      <img className="ride-img" src={`${ride.coaster.imgUrl}`} />
      <div className="ride-info">
        <div className="name-location">
          <h3 className="ride-name">{ride.coaster.name}</h3>
          <p>{rideLocation[0]?.name}</p>
          <p>{rideLocation[0]?.location}</p>
        </div>
        <div className="ride-options">
          {ride.dayRide ? <span>Day Ride ✅</span> : <span>Day Ride</span>}
          {ride.nightRide ? (
            <span>Night Ride ✅</span>
          ) : (
            <span>Night Ride</span>
          )}

          {ride.frontRow ? <span>Front Row ✅</span> : <span>Front Row</span>}
          {ride.backRow ? <span>Back Row ✅</span> : <span>Back Row</span>}
        </div>
        {ride.userId === currentUser.id ? (
          <div className="ride-buttons">
            <button
              className="edit-btn btn btn-info"
              onClick={() => {
                navigate(`/myRides/${ride.id}`);
              }}
            >
              Edit
            </button>
            <button
              className="delete-btn btn btn-warning"
              onClick={() => {
                handleDelete(ride.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="user-name">{ride.user.fullName}</div>
        )}
      </div>
    </section>
  );
};
