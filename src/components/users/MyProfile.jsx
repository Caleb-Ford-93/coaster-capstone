import { useEffect, useState } from "react";
import { UserInfoCard } from "./UserInfoCard.jsx";
import { getUserById } from "../../services/userService.jsx";
import { Button, Container } from "react-bootstrap";
import "./User.css";
import { useNavigate } from "react-router-dom";

export const MyProfile = ({ currentUser }) => {
  const [userStats, setUserStats] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getAndSetUser = () => {
    getUserById(parseInt(currentUser.id)).then((user) => setUser(user[0]));
  };
  useEffect(() => {
    getAndSetUser();
  }, [currentUser]);
  return (
    <Container className="myProfile">
      <UserInfoCard
        user={user}
        setUserStats={setUserStats}
        userStats={userStats}
      />
      <Button
        variant="success"
        className="profile-btn"
        onClick={() => {
          navigate(`/editProfile`);
        }}
      >
        Edit Profile
      </Button>
    </Container>
  );
};
