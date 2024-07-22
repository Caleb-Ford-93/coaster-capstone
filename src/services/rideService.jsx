export const getRidesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/rides?userId=${userId}&_expand=coaster`
  ).then((res) => res.json());
};
