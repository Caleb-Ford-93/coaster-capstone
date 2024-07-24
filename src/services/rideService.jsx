export const getRides = () => {
  return fetch(`http://localhost:8088/rides?_expand=coaster&_expand=user`).then(
    (res) => res.json()
  );
};

export const getRidesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/rides?userId=${userId}&_expand=coaster`
  ).then((res) => res.json());
};

export const createNewRide = (ride) => {
  return fetch(`http://localhost:8088/rides`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ride),
  });
};

export const deleteRide = (id) => {
  return fetch(`http://localhost:8088/rides/${id}`, { method: "DELETE" });
};
export const getRideById = (id) => {
  return fetch(
    `http://localhost:8088/rides?id=${id}&_expand=coaster&_expand=user`
  ).then((res) => res.json());
};
