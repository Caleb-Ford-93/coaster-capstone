export const getCoasters = () => {
  return fetch(`http://localhost:8088/coasters`).then((res) => res.json());
};
