import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./logo.png";
import { FaBagShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import { auth, db } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { FaRegHeart, FaUser } from "react-icons/fa";

const Nave = ({ addCart, singleUser, setSingleUser }) => {
  const [user, loading, error] = useAuthState(auth);
  const [value, loadingg, errorr] = useCollection(collection(db, `Users`));
  const [values, loadinggs, errorrs] = useDocument(
    doc(db, `Users`, `${user && user.uid}`)
  );

  // console.log(singleUser && singleUser);

  const navigate = useNavigate();
  const Logout = async () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const result = values && values.data();
    setSingleUser(result);
  }, [values]);
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
            <Nav className="ms-auto bg-yellow gap-3">
              <Nav.Link
                as={Link}
                to={"/cardshop"}
                className="d-flex rounded-3 px-3"
                style={{
                  border: "solid 3px #ffe26e",
                }}
              >
                <FaBagShopping className=" fs-4 " />
                {/* <p className="mt-1">{addCart && addCart.length}0</p> */}
              </Nav.Link>

              <Nav.Link
                className="d-flex  rounded-3 px-3 "
                style={{ border: "solid 3px #ffe26e" }}
              >
                <FaRegHeart className="mt-1 me-1 fs-4" />
                <p>{addCart && addCart.length}</p>
              </Nav.Link>

              {singleUser ? (
                <div className="d-flex">
                  <div>
                    <img
                      src={singleUser.userImage}
                      className=" rounded-5 "
                      style={{ width: "2.5em" }}
                      alt=""
                    />
                  </div>
                  <Dropdown className=" rounded-4">
                    <div
                      className="rounded-3 py-1 px-2 "
                      style={{ border: "solid 3px #ffe26e" }}
                    >
                      <Dropdown.Toggle className=" bg-transparent border-0 rounded-3 pb-2  text-black">
                        <FaUser className="fs-4  text-black" />
                      </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu>
                      {singleUser.role == "admin" && (
                        <Dropdown.Item as={Link} to={"/admin"}>
                          Control
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item as={Link} to={"/profile"}>
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => Logout()}>
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
                  <FaUser className=" fs-4 " />
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
