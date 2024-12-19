import React from "react";
import "./a4.css";
import facebookpng from './Images/facebook.png'
import twitterpng from './Images/twitter.png'
import instagrampng from './Images/instagram.png'

const Part4 = () => {
  return (
    <div className="footer-container">
      <div className="footer-column">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/features">Features</a>
          </li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Social Handles</h3>
        <ul className="social-list">
          <li>
            <a href="https://www.facebook.com" target="_blank">
              {" "}
              <img src={facebookpng} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank">
            <img src={twitterpng} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank">
              <img src={instagrampng} alt="Instagram" />
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Contact Us</h3>
        <ul>
          <li>Name: Vamsi Mukesh</li>
          <li>Email: vamsimukesh2003@gmail.com</li>
          <li>Phone: +91 9347251042</li>
        </ul>
      </div>
    </div>
  );
};

export default Part4;