import { useEffect, useState } from "react";
import { getParks } from "../../services/parkService";
import { getCoasters } from "../../services/coasterService";

export const NewRideForm = () => {
  const [parks, setParks] = useState([]);
  const [coasters, setCoasters] = useState([]);
  const [coastersByPark, setCoastersByPark] = useState([]);

  const handleParkSelection = (parkId) => {
    const filteredCoasters = coasters.filter(
      (coaster) => coaster.parkId === parseInt(parkId)
    );
    setCoastersByPark(filteredCoasters);
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
      <fieldset className="park-choice">
        <label>Coaster: </label>
        <select className="form-control" defaultValue={"default"}>
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
    </form>
  );
};
