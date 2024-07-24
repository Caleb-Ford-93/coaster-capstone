import { useEffect, useState } from "react";
import { getParks } from "../../services/parkService";
import { getCoasters } from "../../services/coasterService";
import { createNewRide } from "../../services/rideService";
import { useNavigate } from "react-router-dom";

export const NewRideForm = ({ currentUser }) => {
  const [parks, setParks] = useState([]);
  const [coasters, setCoasters] = useState([]);
  const [coastersByPark, setCoastersByPark] = useState([]);
  const [ride, setRide] = useState({
    dayRide: false,
    nightRide: false,
    frontRow: false,
    backRow: false,
    coasterId: 0,
  });

  const navigate = useNavigate();

  const handleParkSelection = (parkId) => {
    const filteredCoasters = coasters.filter(
      (coaster) => coaster.parkId === parseInt(parkId)
    );
    setCoastersByPark(filteredCoasters);
    const rideCopy = { ...ride };
    rideCopy.coasterId = 0;
    setRide(rideCopy);
  };

  const handleChange = (prop, value) => {
    const rideCopy = { ...ride };
    rideCopy[prop] = value;
    setRide(rideCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ride.coasterId) {
      const rideCopy = { ...ride };
      rideCopy.userId = currentUser.id;
      createNewRide(rideCopy).then(navigate("/myRides"));
    } else {
      window.alert(`Something went wrong, please try again`);
    }
  };

  useEffect(() => {}, [coastersByPark]);

  useEffect(() => {
    getParks().then((parks) => {
      setParks(parks);
    });
  }, []);
  useEffect(() => {
    getCoasters().then((coasters) => {
      setCoasters(coasters);
    });
  }, []);

  return (
    <form className="new-ride-form">
      <fieldset className="park-choice">
        <label>Theme Park: </label>
        <select
          className="form-control"
          defaultValue={"default"}
          onChange={(e) => {
            handleParkSelection(e.target.value);
          }}
        >
          <option value={"default"} disabled>
            Chose a Park
          </option>
          {parks.map((park) => (
            <option key={park.id} value={park.id}>
              {park.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset className="coaster-choice">
        <label>Coaster: </label>
        <select
          className="form-control"
          defaultValue={"default"}
          id="coasterId"
          onChange={(e) => {
            handleChange(e.target.id, parseInt(e.target.value));
          }}
        >
          <option value={"default"} disabled>
            Chose a Coaster
          </option>
          {coastersByPark.length > 0
            ? coastersByPark.map((coaster) => (
                <option key={coaster.id} value={coaster.id}>
                  {coaster.name}
                </option>
              ))
            : coasters.map((coaster) => (
                <option key={coaster.id} value={coaster.id}>
                  {coaster.name}
                </option>
              ))}
        </select>
      </fieldset>
      <fieldset className="ride-params">
        <legend>Select all that apply</legend>
        <div>
          <label>Day Ride</label>
          <input
            type="checkbox"
            id="dayRide"
            onChange={(e) => {
              handleChange(e.target.id, e.target.checked);
            }}
          />
        </div>
        <div>
          <label>Night Ride</label>
          <input
            type="checkbox"
            id="nightRide"
            onChange={(e) => {
              handleChange(e.target.id, e.target.checked);
            }}
          />
        </div>
        <div>
          <label>Front Row</label>
          <input
            type="checkbox"
            id="frontRow"
            onChange={(e) => {
              handleChange(e.target.id, e.target.checked);
            }}
          />
        </div>
        <div>
          <label>Back Row</label>
          <input
            type="checkbox"
            id="backRow"
            onChange={(e) => {
              handleChange(e.target.id, e.target.checked);
            }}
          />
        </div>
      </fieldset>
      <fieldset className="submit-button">
        <div>
          <button
            className="btn btn-info"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};
