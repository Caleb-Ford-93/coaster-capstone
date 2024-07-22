import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { MyRides } from "../components/rides/MyRides";
import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const localCoasterUser = localStorage.getItem("coaster_user");
    const coasterUserObject = JSON.parse(localCoasterUser);

    setCurrentUser(coasterUserObject);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="/myRides"
          element={<MyRides currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
