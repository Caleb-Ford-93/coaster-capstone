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
