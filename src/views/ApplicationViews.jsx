import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { MyRides } from "../components/rides/MyRides";
import { useEffect, useState } from "react";
import { NewRideForm } from "../components/forms/NewRideForm";
import { DiscoverRides } from "../components/rides/DiscoverRides";

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
        <Route
          path="/discover"
          element={<DiscoverRides currentUser={currentUser} />}
        />
        <Route
          path="/newRide"
          element={<NewRideForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
