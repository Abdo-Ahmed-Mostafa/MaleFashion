import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./logo.png";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { auth } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import avatarImage from "../../avatar-icon-vector-illustration.jpg";
import { FaRegHeart, FaUser } from "react-icons/fa";

const Nave = ({ addCart, singleUser, onLogout }) => {
  const [user] = useAuthState(auth);
  const [imageSrc, setImageSrc] = useState(
    singleUser?.userImage || avatarImage
  );

  const handleError = () => {
    setImageSrc(avatarImage);
  };
  return (
    <div>
      <div className=" d-flex justify-content-center pt-2 bg-black text-danger fw-bold ">
        <p className="mb-1">Free Shipping, 30-day or refund guarantee.</p>
      </div>
      <Navbar
        expand="lg"
        className="fw-bold bg-white py-3 shadow-sm "
        data-bs-theme="light"
      >
        <Container className=" container ">
          <Navbar.Brand href="#home">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/products"} href="#link">
                Shop
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto  gap-3">
              <Nav.Link
                as={Link}
                to={"/cardshop"}
                className="d-flex rounded-3 px-"
                style={{
                  border: "solid 3px #ffe26e",
                }}
              >
                <FaBagShopping className=" fs-4 mt-2 me-2 " />
                <p className="mt-2">{addCart && addCart.length}</p>
              </Nav.Link>
              <Nav.Link
                className="d-flex  rounded-3 px-3 "
                style={{ border: "solid 3px #ffe26e" }}
                as={Link}
                to="/favorites"
              >
                <FaRegHeart className="mt-2 me-1 fs-4" />
              </Nav.Link>
              {singleUser ? (
                <div className="d-flex">
                  <Dropdown className=" rounded-4 bg-yellow">
                    <div
                      className="rounded-3 h-100 "
                      style={{ border: "solid 3px #ffe26e" }}
                    >
                      <Dropdown.Toggle className=" bg-transparent border-0 rounded-3 text-black">
                        <img
                          src={imageSrc}
                          onError={handleError}
                          width="50"
                          height="50"
                          alt="User Avatar"
                          className=""
                        />
                      </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu className="bg-light">
                      {singleUser.role == "admin" && (
                        <Dropdown.Item as={Link} to={"/admin"}>
                          Control
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        className="bg-yellow3"
                        as={Link}
                        to={"/profile"}
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => onLogout()}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Nav.Link
                  style={{ border: "solid 3px #ffe26e" }}
                  className="rounded-3 px-3 "
                  as={Link}
                  to="/singin"
                >
                  <FaUser className=" fs-4 mt-2 " />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Nave;
