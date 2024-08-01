import { useState } from "react";
import { UserInfoCard } from "./UserInfoCard.jsx";

export const MyProfile = ({ currentUser }) => {
  const [userStats, setUserStats] = useState({});
  return (
    <UserInfoCard
      user={currentUser}
      setUserStats={setUserStats}
      userStats={userStats}
    />
  );
};
