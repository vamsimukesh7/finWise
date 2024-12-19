import React from "react";
import "../";
import "./a1.css";

const Part1 = () => {
  return (
    <div className="banner-container">
      <img
        src="https://3799118.fs1.hubspotusercontent-na1.net/hubfs/3799118/hero-banner-img.png"
        alt="home-1"
        className="banner-img"
      />
      <div className="text-overlay">
        <div>
          <div style={{ fontSize: "24px" }}>Here to Connect you with</div>
          <div style={{ fontSize: "30px", fontFamily: "Arial, sans-serif" }}>
            Business and Financial Strategies
          </div>
        </div>

        <div className="about-us-box">About Us</div>
      </div>
    </div>
  );
};

export default Part1;