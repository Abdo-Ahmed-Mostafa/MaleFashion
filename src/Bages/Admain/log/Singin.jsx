import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import eye from "./view.png";
import closeEye from "./close-eye.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Componenet/Firebase/firebase";
import { InputGroup } from "react-bootstrap";

const Singin = () => {
  const [useremail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [check, setcheck] = useState(true);
  const [handelform, sethandelform] = useState(false);
  const [logein, setloging] = useState("");

  const navegiat = useNavigate();

  const foundUsers = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, useremail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navegiat("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const changeType = () => {
    setcheck(!check);
  };

  return (
    <div>
      <div className="">
        <Form>
          <div className="w-100 d-flex justify-content-center pt-5 ">
            <Form.Group className="mb-3  w-25 fw-bold">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="border-2 border-warning"
                placeholder="Email Address"
                value={useremail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
              <p className=" text-success ">
                We'll Never Share Your email wiht anyone else.
              </p>
              {handelform && (
                <p className=" text-danger fw-bold mb-0 ">
                  Invalid Email OR Password
                </p>
              )}
            </Form.Group>
          </div>
          <div className="w-100 d-flex justify-content-center ">
            <Form.Group
              className="mb-3  w-25 fw-bold  "
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Passoword</Form.Label>

              <InputGroup className="w-100">
                <Form.Control
                  type={check ? "password" : "text"}
                  placeholder="Password"
                  className="border-2 border-warning"
                  value={userPassword}
                  onChange={(e) => setuserPassword(e.target.value)}
                />
                <InputGroup.Text onClick={() => changeType()}>
                  {check ? (
                    <img
                      src={closeEye}
                      alt="Not Found"
                      className="pointer"
                      width={20}
                    />
                  ) : (
                    <img
                      src={eye}
                      alt="Not Found"
                      className="pointer"
                      width={20}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup>

              <div className="d-flex ">
                <input type="checkbox" />
                <p className="mt-3 ms-2">Remember Me</p>
              </div>
            </Form.Group>
          </div>
        </Form>
        {logein.length != 0 && (
          <h5 className="text-danger text-center mb-3">{logein}</h5>
        )}
        <div className="d-flex justify-content-center pb-5 ">
          <Button className="me-4" onClick={foundUsers}>
            Login
          </Button>
          <Button onClick={() => navegiat("/singin/singup")}>
            Create New Acconunt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Singin;
