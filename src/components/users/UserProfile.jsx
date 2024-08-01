import { useParams } from "react-router-dom";
import { UserInfoCard } from "./UserInfoCard.jsx";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService.jsx";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const [userStats, setUserStats] = useState({
    coasterRides: 0,
    uniqueParks: 0,
  });
  const { userId } = useParams();

  const getAndSetUser = () => {
    getUserById(parseInt(userId)).then((user) => setUser(user[0]));
  };

  useEffect(() => {
    getAndSetUser();
  }, []);
  return (
    <UserInfoCard
      user={user}
      userStats={userStats}
      setUserStats={setUserStats}
    />
  );
};
