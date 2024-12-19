import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./a3.css";

const Part3 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="part3-container">
      <h2>Our Features</h2>
      <Slider {...settings}>
        <div className="slide">
          <div className="left-content1">
            <p>
              <b>Budget</b>
              <br />
              Manage your finances effectively with our budgeting feature. Set
              monthly budgets, track expenses, and get insights into your
              spending habits. Stay on top of your financial goals and make
              informed decisions about your money.
            </p>
          </div>
          <div className="right-content1">
            <img
              src="https://img.freepik.com/free-photo/high-angle-budget-wooden-blocks_23-2148543187.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710806400&semt=ais"
              alt="Budget"
              className="feature-image"
            />
          </div>
        </div>
        <div className="slide">
          <div className="left-content1">
            <p>
              <b>Investments</b>
              <br />
              Explore investment opportunities and grow your wealth with
              confidence. Our investment feature provides access to a range of
              investment options, from stocks and bonds to mutual funds and
              more. Make strategic investment decisions based on market trends
              and expert insights.
            </p>
          </div>
          <div className="right-content1">
            <img
              src="https://img.freepik.com/free-vector/indian-money-rupee-sign-background-key-economic-prosperity_1017-44467.jpg?t=st=1710950597~exp=1710954197~hmac=f22d63d9423267ffdf424e2171854a2f2ebe7bde941b1526584449203459ab39&w=2000  "
              alt="Investments"
              className="feature-image"
            />
          </div>
        </div>
        <div className="slide">
          <div className="left-content1">
            <p>
              <b>Tax Saving</b>
              <br />
              Maximize your tax savings and optimize your financial strategy
              with our tax-saving feature. Discover tax-saving schemes,
              deductions, and exemptions tailored to your financial profile.
              Stay compliant with tax regulations while reducing your tax burden
              and increasing your savings.
            </p>
          </div>
          <div className="right-content1">
            <img
              src="https://www.barodabnpparibasmf.in/assets/images/banner-save-tax.jpg"
              alt="Tax Saving"
              className="feature-image"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Part3;