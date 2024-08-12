import { useEffect, useState } from "react";
import { getParks } from "../../services/parkService";
import { getCoasters } from "../../services/coasterService";
import { createNewRide } from "../../services/rideService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    lastRode: new Date(),
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
      createNewRide(rideCopy).then(() => {
        navigate("/myRides");
      });
    } else {
      window.alert(`Something went wrong, please try again`);
    }
  };

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
    <Form className="form">
      <Form.Group className="park-choice">
        <Form.Label>
          Theme Park:
          <Form.Select
            size="lg"
            name="themeParkSelect"
            onChange={(e) => {
              handleParkSelection(e.target.value);
            }}
          >
            <option>Chose a Park</option>
            {parks.map((park) => (
              <option key={park.id} value={park.id}>
                {park.name}
              </option>
            ))}
          </Form.Select>
        </Form.Label>
      </Form.Group>
      <Form.Group className="coaster-choice">
        <Form.Label>
          Coaster:
          <Form.Select
            size="lg"
            id="coasterId"
            onChange={(e) => {
              handleChange(e.target.id, parseInt(e.target.value));
            }}
          >
            <option>Chose a Coaster</option>
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
          </Form.Select>
        </Form.Label>
      </Form.Group>
      <Form.Group className="ride-params">
        <legend>Select all that apply: </legend>

        <Form.Check
          type="checkbox"
          id="dayRide"
          label="Day Ride"
          onChange={(e) => {
            handleChange(e.target.id, e.target.checked);
          }}
        />

        <Form.Check
          type="checkbox"
          id="nightRide"
          label="Night Ride"
          onChange={(e) => {
            handleChange(e.target.id, e.target.checked);
          }}
        />

        <Form.Check
          type="checkbox"
          id="frontRow"
          label="Front Row"
          onChange={(e) => {
            handleChange(e.target.id, e.target.checked);
          }}
        />

        <Form.Check
          type="checkbox"
          id="backRow"
          label="Back Row"
          onChange={(e) => {
            handleChange(e.target.id, e.target.checked);
          }}
        />
      </Form.Group>
      <Form.Group className="submit-button">
        <Button
          type="submit"
          className="btn form-btn"
          variant="success"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};
