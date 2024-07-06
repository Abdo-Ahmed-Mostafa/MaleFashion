import React from "react";
// import HomeImage from "./hero-1.jpg";
import { Button } from "react-bootstrap";
import { ImArrowRight2 } from "react-icons/im";

const TopHome = () => {
  return (
    <div className="">
      <div>
        <div className="landing__container">
          <div className="landing__header__container">
            <div className="landing__header">
              <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
              <h1 className="landing__header__main">
                Checkout The Best Fashion Style
              </h1>
              <a href="/shop">
                <button className="btn btn-outline-dark rounded-4">
                  SHOP NOW
                  <ImArrowRight2 className="ms-3" />
                </button>
              </a>
            </div>
          </div>
          <div className="landing__image__container">
            <img
              className="landing__image"
              src="https://shemashop.vercel.app/static/media/men2.e2bb29b95d23d0e4e42f.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHome;
