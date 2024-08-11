import React from "react";
import text from "./about-us.jpg";

const EndHome = () => {
  return (
    <div>
      <div className="mb-5 boda d-flex justify-content-center align-items-center text-light w-100  ">
        <h3>Free shipping , 30-day return or refund guarantee.</h3>

        <div
          style={{
            height: "10vh",
            backgroundImage: `url(${text})`,
            backgroundPosition: "center",
            backgroundSize: "100em 100em",
            zIndex: "-1",
            position: "absolute",
          }}
          className="w-100 "
        >
          {" "}
        </div>
      </div>
      <div className="d-flex container justify-content-evenly w-100   mb-5"></div>
    </div>
  );
};

export default EndHome;
