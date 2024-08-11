import React from "react";
import Flogo from "./footer-logo.png";
import Visa from "./payment.png";
import Img1 from "./client-1.png";
import Img4 from "./client-5.png";
import Img3 from "./client-3.png";
import Img2 from "./client-4.png";
import { Form } from "react-bootstrap";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="d-flex flex-column">
      <div style={{ background: "#f7d559" }} className="pb-5 d-flex flex-column">
        <div className="container text-black border-bottom border-2 border-white">
          <div className="row py-5">
            <div className="col-lg-3 col-md-6 text-center mb-4">
              <img src={Flogo} alt="Footer Logo" className="img-fluid" />
              <div className="mt-4 fw-bold">
                <p className="m-0">The Customer is at the heart of our</p>
                <p className="m-0">unique business model, which includes</p>
                <p className="m-0">design.</p>
                <img src={Visa} className="mt-5 img-fluid" alt="Payment Methods" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 text-center mb-4">
              <h4>SHOPPING</h4>
              <p>Home</p>
              <p>Shop</p>
              <p>About Us</p>
            </div>
            <div className="col-lg-3 col-md-6 text-center mb-4">
              <h4>PARTNER</h4>
              <div className="mb-3 d-flex flex-wrap justify-content-center">
                <img src={Img1} className="me-3 img-fluid mb-2" width="20%" alt="Client 1" />
                <img src={Img3} className="me-3 img-fluid mb-2" width="20%" alt="Client 3" />
                <img src={Img2} className="me-3 img-fluid mb-2" width="20%" alt="Client 2" />
                <img src={Img4} className="img-fluid mb-2" width="20%" alt="Client 4" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center mb-4">
              <h4>NEWSLETTER</h4>
              <p>Be the first to know about new arrivals,</p>
              <p>look books, sales & promos!</p>
              <Form>
                <input
                  type="text"
                  className="bg-transparent border-top-0 border-end-0 border-start-0 w-100 text-black"
                  placeholder="Enter your email"
                />
              </Form>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <h5 className="text-black">
            Copyright <FaRegCopyright className="m-1" /> 2024 & 2021
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
