import { useEffect, useState } from "react";
import { getParkById } from "../../services/parkService";
// import "./Ride.css";
import { deleteRide } from "../../services/rideService";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";

export const Ride = ({ ride, currentUser, getAndSetAllRides }) => {
  const [rideLocation, setRideLocation] = useState({});

  const navigate = useNavigate();

  const getAndSetRideLocation = (parkId) => {
    getParkById(parkId).then((park) => {
      setRideLocation(park);
    });
  };

  const handleDelete = (id) => {
    deleteRide(id).then(() => {
      getAndSetAllRides();
    });
  };

  useEffect(() => {
    getAndSetRideLocation(ride.coaster.parkId);
  }, [ride]);
  return (
    <Col className="d-flex align-items-stretch">
      <Card className="card" bg="dark" text="white">
        <Card.Img
          className="coaster-img"
          variant="top"
          src={`${ride.coaster.imgUrl}`}
        />
        <Card.Body className="ride-info">
          <Card.Title className="ride-name">{ride.coaster.name}</Card.Title>
          <Card.Subtitle>{rideLocation[0]?.name}</Card.Subtitle>
          <Card.Subtitle>{rideLocation[0]?.location}</Card.Subtitle>
        </Card.Body>
        <Card.Body className="ride-info">
          <Row>
            <Col>
              {ride.dayRide ? (
                <Card.Text>Day Ride ✅</Card.Text>
              ) : (
                <Card.Text>Day Ride</Card.Text>
              )}
            </Col>
            <Col>
              {ride.nightRide ? (
                <Card.Text>Night Ride ✅</Card.Text>
              ) : (
                <Card.Text>Night Ride</Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {ride.frontRow ? (
                <Card.Text>Front Row ✅</Card.Text>
              ) : (
                <Card.Text>Front Row</Card.Text>
              )}
            </Col>
            <Col>
              {ride.backRow ? (
                <Card.Text>Back Row ✅</Card.Text>
              ) : (
                <Card.Text>Back Row</Card.Text>
              )}
            </Col>
          </Row>
        </Card.Body>

        {ride.userId === currentUser.id ? (
          <Card.Footer className="ride-buttons">
            <Button
              variant="success"
              onClick={() => {
                navigate(`/myRides/${ride.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(ride.id);
              }}
            >
              Delete
            </Button>
          </Card.Footer>
        ) : (
          <div className="user-name">
            <Button variant="secondary" href={`/discover/${ride.user.id}`}>
              {ride.user.fullName}
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
};

{
  /* <section className="ride-card">
      <img className="ride-img" src={`${ride.coaster.imgUrl}`} />
      <div className="ride-info">
        <div className="name-location">
          <h3 className="ride-name">{ride.coaster.name}</h3>
          <p>{rideLocation[0]?.name}</p>
          <p>{rideLocation[0]?.location}</p>
        </div>
        <div className="ride-options">
          {ride.dayRide ? <span>Day Ride ✅</span> : <span>Day Ride</span>}
          {ride.nightRide ? (
            <span>Night Ride ✅</span>
          ) : (
            <span>Night Ride</span>
          )}

          {ride.frontRow ? <span>Front Row ✅</span> : <span>Front Row</span>}
          {ride.backRow ? <span>Back Row ✅</span> : <span>Back Row</span>}
        </div>
        {ride.userId === currentUser.id ? (
          <div className="ride-buttons">
            <button
              className="edit-btn btn btn-info"
              onClick={() => {
                navigate(`/myRides/${ride.id}`);
              }}
            >
              Edit
            </button>
            <button
              className="delete-btn btn btn-warning"
              onClick={() => {
                handleDelete(ride.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="user-name">
            <Link to={`/discover/${ride.user.id}`}>{ride.user.fullName}</Link>
          </div>
        )}
      </div>
    </section> */
}
