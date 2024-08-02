import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUserById, updateUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export const EditProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const navigate = useNavigate();
  const getAndSetUser = () => {
    getUserById(currentUser.id).then((user) => {
      setUser(user[0]);
    });
  };
  const handleChange = (prop, value) => {
    setEditUser((editUser) => ({
      ...editUser,
      [prop]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editUser).then(() => {
      navigate("/myProfile");
    });
  };

  useEffect(() => {
    getAndSetUser();
  }, [currentUser]);
  useEffect(() => {
    setEditUser({ ...user });
  }, [user]);
  return (
    <Form className="form">
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className="profile-input"
          type="email"
          id="email"
          defaultValue={user?.email}
          placeholder={`${user?.email}`}
          onChange={(e) => {
            handleChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Favorite Coaster</Form.Label>
        <Form.Control
          className="profile-input"
          type="text"
          id="favCoaster"
          placeholder={`${user?.favCoaster}`}
          defaultValue={user?.favCoaster}
          onChange={(e) => {
            handleChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>

      <Button
        variant="success"
        className="btn form-btn"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};
