import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRideById, updateRide } from "../../services/rideService";
import { getParkById } from "../../services/parkService";

export const EditRideForm = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState({});
  const [park, setPark] = useState({});
  const [editRide, setEditRide] = useState({
    dayRide: false,
    nightRide: false,
    frontRow: false,
    backRow: false,
  });
  const navigate = useNavigate();

  const getAndSetPark = (parkId) => {
    getParkById(parseInt(parkId)).then((park) => {
      setPark(park[0]);
    });
  };

  const handleChange = (prop, value) => {
    setRide((ride) => ({
      ...ride,
      [prop]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateRide(editRide).then(() => {
      navigate("/myRides");
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

  useEffect(() => {
    if (ride.userId) {
      const rideToEdit = {
        id: rideId,
        dayRide: ride.dayRide,
        nightRide: ride.nightRide,
        frontRow: ride.frontRow,
        backRow: ride.backRow,
        coasterId: ride.coasterId,
        userId: ride.userId,
      };
      setEditRide(rideToEdit);
    }
  }, [ride, rideId]);

  return (
    <form>
      <h3>{ride.coaster?.name}</h3>
      <h4>
        Located at {park?.name}, {park?.location}.
      </h4>
      <fieldset>
        <div>
          <label>
            Day Ride
            <input
              type="checkbox"
              checked={editRide.dayRide}
              id="dayRide"
              onChange={(e) => {
                handleChange(e.target.id, e.target.checked);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Night Ride
            <input
              type="checkbox"
              checked={editRide.nightRide}
              id="nightRide"
              onChange={(e) => {
                handleChange(e.target.id, e.target.checked);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Front Row
            <input
              type="checkbox"
              checked={editRide.frontRow}
              id="frontRow"
              onChange={(e) => {
                handleChange(e.target.id, e.target.checked);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Back Row
            <input
              type="checkbox"
              checked={editRide.backRow}
              id="backRow"
              onChange={(e) => {
                handleChange(e.target.id, e.target.checked);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <button
          type="submit"
          className="btn btn-info"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Save Changes
        </button>
      </fieldset>
    </form>
  );
};
