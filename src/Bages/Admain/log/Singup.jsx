import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../Componenet/Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Singup = () => {
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userImage, setuserImage] = useState("");
  const [userCity, setuserCity] = useState("");
  const [userGender, setuserGender] = useState("male");
  const [userPhoneNumber, setuserPhoneNumber] = useState("");
  const [checkFirstName, setcheckFirstName] = useState(true);
  const [checkLastName, setCheckLastName] = useState(true);
  const [checkName, setcheckName] = useState(true);
  const [checkEmail, setcheckEmail] = useState(true);
  const [checkPassword, setcheckPassword] = useState(true);
  const [checkImage, setcheckImage] = useState(true);
  const [checkCity, setcheckCity] = useState(true);
  const [checkPhoneNumber, setcheckPhoneNumber] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [box, setbox] = useState(true);
  const [role, setRole] = useState("member");
  const [loding, setloding] = useState(true);
  const navigate = useNavigate();
  const trueForm = () => {
    setcheckFirstName(true);
    setCheckLastName(true);
    setcheckName(true);
    setcheckEmail(true);
    setcheckPassword(true);
    setcheckImage(true);
    setcheckCity(false);
    setcheckPhoneNumber(true);
    setbox(true);
  };

  const handelForm = async (prevent) => {
    prevent.preventDefault();
    if (
      userFirstName != "" &&
      userLastName != "" &&
      userName != "" &&
      userEmail != "" &&
      userPassword != "" &&
      userImage != "" &&
      userCity != "" &&
      userGender != "" &&
      userPhoneNumber != ""
    ) {
      setCheckbox(false);
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: `${userFirstName} ${userLastName}`,
            photoURL: userImage,
          })
            .then(() => {})
            .catch((error) => {
              // An error occurred
              // ...
            });
          setDoc(doc(db, "Users", `${user.uid}`), {
            userFirstName,
            userLastName,
            userName,
            userEmail,
            userPassword,
            userImage,
            userCity,
            userGender,
            userPhoneNumber,
            role,
            id: user.uid,
          });

          navigate("/singin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);

          // ..
        });
    } else {
      setCheckbox(true);
    }
  };

  return (
    <div>
      <div className=" ">
        <Form
          onSubmit={(prevent) => handelForm(prevent)}
          className=" container shadow w-50 my-5 "
        >
          <div className="w-100 d-flex justify-content-center pt-5 ">
            <Form.Group
              className={
                checkFirstName
                  ? "mb-3  w-50 mx-3 fw-bold text-dark  "
                  : "mb-3  w-50 mx-3 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkFirstName ? "First Name" : "Invalid First Name"}
              </Form.Label>
              <Form.Control
                type="text"
                value={userFirstName}
                placeholder="Enter First Name"
                className="border-2 border-warning"
                onChange={(e) => setuserFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className={
                checkLastName
                  ? "mb-3  w-50 mx-3 ms-5 fw-bold text-dark  "
                  : "mb-3  w-50 mx-3 ms-5 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkLastName ? "Last Name" : "Invalid Last Name"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Last Name"
                value={userLastName}
                onChange={(e) => setuserLastName(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column align-items-center  w-100 ">
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkName
                  ? "mb-3  fw-bold text-dark "
                  : "mb-3  fw-bold text-danger"
              }
            >
              <Form.Label>
                {checkName ? "User Name" : "Invalid User Name"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkEmail
                  ? "mb-3  fw-bold text-dark "
                  : "mb-3  fw-bold text-danger "
              }
            >
              <Form.Label>{checkEmail ? "Email" : "invalid Email"}</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Email"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkPassword
                  ? "mb-3 fw-bold text-dark "
                  : "mb-3 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkPassword ? "Password" : "Invalid password"}
              </Form.Label>
              <Form.Control
                type="password"
                className="border-2 border-warning"
                placeholder="password"
                value={userPassword}
                onChange={(e) => setuserPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkImage
                  ? "mb-3 fw-bold text-dark "
                  : "mb-3 fw-bold text-danger "
              }
            >
              <Form.Label>{checkImage ? "Image" : "Invalid image"}</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Image *-must start with https and end with jpg-* "
                value={userImage}
                onChange={(e) => setuserImage(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center ">
            <Form.Group
              style={{ width: "25.5%" }}
              className={
                checkCity
                  ? "mb-3 me-5 fw-bold text-dark "
                  : "mb-3 me-5 fw-bold text-danger "
              }
            >
              <Form.Label>{checkCity ? "City" : "Invalid City"}</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter City"
                value={userCity}
                onChange={(e) => setuserCity(e.target.value)}
              />
            </Form.Group>

            <p style={{ width: "0em" }} className="fw-bold text-center">
              Gender
            </p>

            <select
              style={{ width: "25.5%", height: "5vh", marginTop: "2.1em" }}
              className="mb-3 me-5 rounded border-2 border-warning "
              value={userGender}
              onChange={(e) => setuserGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Famle">Female</option>
            </select>

            <Form.Group
              style={{ width: "25.5%" }}
              className={
                checkPhoneNumber
                  ? "mb-3 text-dark  fw-bold "
                  : "mb-3   fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkPhoneNumber ? "Phone Number" : "Invalid Phone Number"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder=" Phone Number"
                value={userPhoneNumber}
                onChange={(e) => setuserPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </div>
          <div
            style={{ width: "68%" }}
            className="d-flex justify-content-center  ms-4 "
          >
            <input
              type="checkbox"
              style={{ width: "2.5%" }}
              // onChange={(e) => setCheckbox(e.target.checked)}
            />
            <h5
              style={checkbox ? { color: "red" } : { color: "black" }}
              className="mt-2 ms-2 fw-bold "
            >
              {checkbox
                ? "please Apply Rules and conditions"
                : " Apply Rules and conditions"}
            </h5>
          </div>
          <div className="d-flex justify-content-center mt-5 pb-5">
            <Button type="submit" variant="outline-warning text-dark fw-bold" >
              {loding ? (
                "Create Account"
              ) : (
                <Spinner animation="border" variant="dark" />
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Singup;
