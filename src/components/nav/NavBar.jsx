import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary nav-bar"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">Coaster Track</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href="myRides">
              My Rides
            </Nav.Link>
            <Nav.Link href="discover">Discover</Nav.Link>
            <Nav.Link href="newRide">New Ride</Nav.Link>

            <NavDropdown
              title={`Signed in as ${currentUser.name}`}
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  localStorage.removeItem("coaster_user");
                  navigate("/", { replace: true });
                }}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
