import React from "react";
import Flogo from "./footer-logo.png";
import Visa from "./payment.png";
import Img1 from "./client-1.png";
import Img4 from "./client-5.png";
import Img3 from "./client-3.png";
import Img2 from "./client-4.png";
import { Form } from "react-bootstrap";
import { FaRegCopyright } from "react-icons/fa6";

const Foter = () => {
  return (
    <div className=" ">
   
      <div style={{ background: "#f7d559" }} className=" pb-5">
        <div
          style={{ gap: "140px" }}
          className="  d-flex container text-light border-bottom  border-2 border-white  text-black "
        >
          {" "}
          <div className="mt-5  text-black">
            <img src={Flogo} alt="" />
            <div className="mt-4 mb-4 fw-bold ">
              <p className="m-0">The Customer is at the heart of our</p>
              <p className="m-0">unique business model, which includes</p>
              <p className="m-0">design.</p>
              <img src={Visa} className="mt-5  " alt="" />
            </div>
          </div>
          <div className="  mt-5  ">
            <h4>SHOPPING</h4>
            <p>Home</p>
            <p>Shop</p>
            <p>Apout Us</p>
          </div>
          <div className="mt-5">
            <h4>PARTNER</h4>
            <div className="mb-3">
              <img src={Img1} className="me-5" width="20%" alt="" />
              <img src={Img3} width="20%" alt="" />
            </div>
            <img src={Img2} className="me-5" width="20%" alt="" />
            <img src={Img4} width="20%" alt="" />
          </div>
          <div className="mt-5">
            <h4>NEWLETTER</h4>
            <p>Be the first to know about new arrivals, </p>
            <p>look books ,sales & promos!</p>
            <Form>
              <input
                type="text"
                className=" bg-transparent border-top-0 border-end-0 border-start-0 b  w-100 text-light "
              />
            </Form>
          </div>
        </div>
       <div>
       <h5 className="d-flex justify-content-center text-light mt-4  text-black">
          Copyright <FaRegCopyright className="m-1 " /> 2024& 2021
        </h5>
       </div>
      </div>
    </div>
  );
};

export default Foter;
