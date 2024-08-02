import { useState } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

export const NewsCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={10000}>
        <Image
          className="d-block w-100"
          src="../src/images/universal-epic-universe.jpg"
        />
        <Carousel.Caption>
          <h3>Epic Universe Construction</h3>
          <p>{`Universal's newest theme park is well under way!`} </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="../src/images/fullTopThrill2.jpg"
        />
        <Carousel.Caption>
          <h3>Top Thrill 2 Is Still Down</h3>
          <p>When will it re-open? No one can say.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="../src/images/loch-ness-monster-3.png"
        />
        <Carousel.Caption>
          <h3>Loch Ness Monster Reopens!</h3>
          <p>
            Loch Ness Monster has re-opened at Bush Gardens Williamsburg with a
            fresh new look!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
