export const getParkById = (id) => {
  return fetch(`http://localhost:8088/parks?id=${id}`).then((res) =>
    res.json()
  );
};
export const getParks = () => {
  return fetch(`http://localhost:8088/parks`).then((res) => res.json());
};
