import "./Welcome.css";
import { NewsCarousel } from "./NewsCarousel.jsx";
export const Welcome = () => {
  return (
    <>
      <div className="welcome-splash">
        <h1>Welcome to Coaster Track</h1>
      </div>
      <NewsCarousel />
    </>
  );
};
