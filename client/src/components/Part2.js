import React from "react";
import "./a2.css";

const Part2 = () => {
  return (
    <div className="part2-container">
      <div className="left-content">
        <h2>About Us</h2>
        <p className="p21">
          At <b>Finwise</b>, we are dedicated to empowering individuals and
          businesses by providing innovative tools and resources for financial
          success. Our platform offers a range of features designed to
          streamline financial management and promote financial literacy. With
          us, you can effortlessly monitor various income sources, record and
          categorize expenses to better understand spending habits, set and
          manage savings goals, and track progress towards financial targets
          effectively. We believe in fostering a financially aware and
          responsible community through engagement and shared financial
          knowledge. Our mission is to empower individuals to take control of
          their finances and work towards a sustainable financial future. Join
          us in our journey towards financial empowerment and let's build a
          brighter financial future together!
        </p>

        <div className="about-us-box">Features</div>
      </div>
      <div className="right-content flip">
        <img
          src="https://leapscholar.com/blog/wp-content/uploads/2022/03/shutterstock_1697077897-min-scaled-1-1024x683.jpg"
          alt="Website Image"
          className="website-image"
        />
      </div>
    </div>
  );
};

export default Part2;