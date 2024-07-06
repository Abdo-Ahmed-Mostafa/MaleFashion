import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../../../Componenet/Firebase/firebase";
import { updateProfile } from "firebase/auth";

const EditeUsers = () => {
  const [users, setUSers] = useState([]);
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userImage, setuserImage] = useState("");
  const [userCity, setuserCity] = useState("");
  const [userGender, setuserGender] = useState("male");
  const [userPhoneNumber, setuserPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { usersid } = useParams();
  const getUsers = () => {
    axios({
      method: "get",
      url: `http://localhost:9000/users/${usersid}`,
    }).then((data) => setUSers(data.data));
  };
  const edietUsers = (prevent) => {
    prevent.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: `${userFirstName} ${userLastName}`,
      photoURL: userImage,
    }).then(() => {});
    navigate(-1);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Form onSubmit={(prevent) => edietUsers(prevent)}>
        <div className="w-100 d-flex justify-content-center pt-5 ">
          <Form.Group className="mb-3  w-25 fw-bold text-dark  ">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={userFirstName}
              onChange={(e) => setuserFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3  w-25 ms-5 fw-bold text-dark  ">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={userLastName}
              onChange={(e) => setUSers(setuserLastName(e.target.value))}
            />
          </Form.Group>
        </div>
        <div className="d-flex flex-column align-items-center  w-100 ">
          <Form.Group
            style={{ width: "54%" }}
            className="mb-3  fw-bold text-dark "
          >
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={users.username}
              onChange={(e) => setUSers({ ...users, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group
            style={{ width: "54%" }}
            className="mb-3  fw-bold text-dark "
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={users.useremail}
              onChange={(e) =>
                setUSers({ ...users, useremail: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            style={{ width: "54%" }}
            className="mb-3 fw-bold text-dark "
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={users.userpassword}
              onChange={(e) =>
                setUSers({ ...users, userpassword: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            style={{ width: "54%" }}
            className="mb-3 fw-bold text-dark "
          >
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image *-must start with https and end with jpg-* "
              value={userImage}
              onChange={(e) => setUSers(setuserImage(e.target.value))}
            />
          </Form.Group>
          <Form.Group
            style={{ width: "54%" }}
            className="mb-3 fw-bold text-dark "
          >
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role"
              value={users.role}
              onChange={(e) => setUSers({ ...users, role: e.target.value })}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center ">
          <Form.Group
            style={{ width: "15.5%" }}
            className="mb-3 me-5 fw-bold text-dark "
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={users.usercity}
              onChange={(e) => setUSers({ ...users, usercity: e.target.value })}
            />
          </Form.Group>

          <p style={{ width: "0em" }} className="fw-bold text-center">
            Gender
          </p>

          <select
            style={{ width: "15.5%", height: "5vh", marginTop: "2.1em" }}
            className="mb-3 me-5 rounded border-0 "
            value={users.usergender}
            onChange={(e) => setUSers({ ...users, usergender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Famle">Female</option>
          </select>

          <Form.Group
            style={{ width: "15.5%" }}
            className="mb-3 text-dark  fw-bold "
          >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Phone Number"
              value={users.userphoneNumber}
              onChange={(e) =>
                setUSers({ ...users, userphoneNumber: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center mt-5 pb-5">
          <Button type="submit" className="me-5">
            Edite
          </Button>
          <Button onClick={() => navigate(-1)}>Back To Admin Bage</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditeUsers;
