import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import Button from "react-bootstrap/Button";

export const Login = () => {
  const [email, set] = useState("caleb.ford@coastertrack.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "coaster_user",
          JSON.stringify({
            id: user.id,
            fullName: user.fullName,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Coaster Track</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <Button variant="success" className="login-btn" type="submit">
                Sign in
              </Button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Create Account</Link>
      </section>
    </main>
  );
};
