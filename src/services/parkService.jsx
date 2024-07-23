export const getParkById = (id) => {
  return fetch(`http://localhost:8088/parks?id=${id}`).then((res) =>
    res.json()
  );
};
