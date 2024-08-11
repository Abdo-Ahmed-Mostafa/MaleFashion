import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../Componenet/Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [stateForm, setStateForm] = useState({
    userFirstName: "",
    userLastName: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    userImage: "",
    userCity: "",
    userGender: "male",
    userPhoneNumber: "",
    role: "member",
  });

  const [checkForm, setCheckForm] = useState({
    checkFirstName: true,
    checkLastName: true,
    checkName: true,
    checkEmail: true,
    checkPassword: true,
    checkImage: true,
    checkCity: true,
    checkPhoneNumber: true,
  });

  const returnAllCheck = () => {
    setCheckForm({
      checkFirstName: true,
      checkLastName: true,
      checkName: true,
      checkEmail: true,
      checkPassword: true,
      checkImage: true,
      checkCity: true,
      checkPhoneNumber: true,
    });
  };
  // console.log(stateForm.userEmail.endsWith(".com"));

  const updateCheckForm = (fieldToUpdate) => {
    setCheckForm((prevState) => ({
      ...prevState,
      [fieldToUpdate]: false,
    }));
  };

  const handleForm = async (prevent) => {
    prevent.preventDefault();
    returnAllCheck();
    let formIsValid = true;

    if (stateForm.userFirstName === "" || stateForm.userFirstName.length < 4) {
      updateCheckForm("checkFirstName");
      formIsValid = false;
    }
    if (stateForm.userLastName === "" || stateForm.userLastName.length < 4) {
      updateCheckForm("checkLastName");
      formIsValid = false;
    }
    if (stateForm.userName === "" || stateForm.userName.length < 4) {
      updateCheckForm("checkName");
      formIsValid = false;
    }
    if (stateForm.userEmail === "" || !stateForm.userEmail.endsWith(".com")) {
      updateCheckForm("checkEmail");
      formIsValid = false;
    }
    if (stateForm.userPassword === "" || stateForm.userPassword.length < 6) {
      updateCheckForm("checkPassword");
      formIsValid = false;
    }
    if (stateForm.userImage === "" || !stateForm.userImage.startsWith("http")) {
      updateCheckForm("checkImage");
      formIsValid = false;
    }
    if (stateForm.userCity === "" || stateForm.userCity.length < 2) {
      updateCheckForm("checkCity");
      formIsValid = false;
    }
    if (
      stateForm.userPhoneNumber === "" ||
      stateForm.userPhoneNumber.length < 10
    ) {
      updateCheckForm("checkPhoneNumber");
      formIsValid = false;
    }

    if (formIsValid) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          stateForm.userEmail,
          stateForm.userPassword
        );
        const user = userCredential.user;

        await updateProfile(auth.currentUser, {
          displayName: `${stateForm.userFirstName} ${stateForm.userLastName}`,
          photoURL: stateForm.userImage,
        });

        await setDoc(doc(db, "Users", `${user.uid}`), {
          stateForm,
          id: user.uid,
        });

        setLoading(false);
        navigate("/singin");
      } catch (error) {
        console.error("Error signing up:", error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className=" ">
        <Form onSubmit={handleForm} className=" container shadow w-50 my-5 ">
          <div className="w-100 d-flex justify-content-center pt-5 ">
            <Form.Group
              className={
                checkForm.checkFirstName
                  ? "mb-3  w-50 mx-3 fw-bold text-dark  "
                  : "mb-3  w-50 mx-3 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkFirstName ? "First Name" : "Invalid First Name"}
              </Form.Label>
              <Form.Control
                type="text"
                value={stateForm.userFirstName}
                placeholder="Enter First Name"
                className="border-2 border-warning"
                onChange={(e) =>
                  setStateForm({ ...stateForm, userFirstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className={
                checkForm.checkLastName
                  ? "mb-3  w-50 mx-3 ms-5 fw-bold text-dark  "
                  : "mb-3  w-50 mx-3 ms-5 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkLastName ? "Last Name" : "Invalid Last Name"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Last Name"
                value={stateForm.userLastName}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userLastName: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column align-items-center  w-100 ">
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkForm.checkName
                  ? "mb-3  fw-bold text-dark "
                  : "mb-3  fw-bold text-danger"
              }
            >
              <Form.Label>
                {checkForm.checkName ? "User Name" : "Invalid User Name"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter User Name"
                value={stateForm.userName}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkForm.checkEmail
                  ? "mb-3  fw-bold text-dark "
                  : "mb-3  fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkEmail ? "Email" : "invalid Email"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Email"
                value={stateForm.userEmail}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userEmail: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkForm.checkPassword
                  ? "mb-3 fw-bold text-dark "
                  : "mb-3 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkPassword ? "Password" : "Invalid password"}
              </Form.Label>
              <Form.Control
                type="password"
                className="border-2 border-warning"
                placeholder="password"
                value={stateForm.userPassword}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userPassword: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              style={{ width: "84%" }}
              className={
                checkForm.checkImage
                  ? "mb-3 fw-bold text-dark "
                  : "mb-3 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkImage ? "Image" : "Invalid image"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter Image *-must start with https and end with jpg-* "
                value={stateForm.userImage}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userImage: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center ">
            <Form.Group
              style={{ width: "25.5%" }}
              className={
                checkForm.checkCity
                  ? "mb-3 me-5 fw-bold text-dark "
                  : "mb-3 me-5 fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkCity ? "City" : "Invalid City"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Enter City"
                value={stateForm.userCity}
                onChange={(e) =>
                  setStateForm({ ...stateForm, userCity: e.target.value })
                }
              />
            </Form.Group>

            <p style={{ width: "0em" }} className="fw-bold text-center">
              Gender
            </p>

            <select
              style={{ width: "25.5%", height: "5vh", marginTop: "2.1em" }}
              className="mb-3 me-5 rounded border-2 border-warning "
              value={stateForm.userGender}
              onChange={(e) =>
                setStateForm({ ...stateForm, userGender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <Form.Group
              style={{ width: "25.5%" }}
              className={
                checkForm.checkPhoneNumber
                  ? "mb-3 text-dark  fw-bold "
                  : "mb-3   fw-bold text-danger "
              }
            >
              <Form.Label>
                {checkForm.checkPhoneNumber
                  ? "Phone Number"
                  : "Invalid Phone Number"}
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder=" Phone Number"
                value={stateForm.userPhoneNumber}
                onChange={(e) =>
                  setStateForm({
                    ...stateForm,
                    userPhoneNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center mt-5 pb-5">
            <Button type="submit" variant="outline-warning text-dark fw-bold">
              {loading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
