import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../Componenet/Firebase/firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const ViewUsers = () => {
  const [users, setUSers] = useState([]);
  const navigate = useNavigate();

  const { usersid } = useParams();

  const [values, loadinggs, errorrs] = useDocument(
    doc(db, `Users`, `${usersid}`)
  );
  // setSingleUser(query(collection(db, "Users"), where("id", "==", usersid)));
  const data = values && values.data();
  console.log(data);
  useEffect(() => {
    // getUsers();
  }, []);
  return (
    <div className="d-flex vh-100 bg-secondary  ">
      <div className="w-25 border-end border-3 border-light ">
        <img src={data?.userImage} width="99%" alt="ImgNotFound" />
      </div>

      <div className="w-75 me-5 ms-5 ">
        <div className=" d-flex justify-content-between containe text-light">
          <div
            style={{ height: "80vh" }}
            className="d-flex flex-column col-6 justify-content-evenly align-items-center  "
          >
            <h1 className="fs-3">UserName : {data?.userName}</h1>
            <h1 className="fs-3">LastName : {data?.userLastName}</h1>
            <h1 className="fs-3">Password : {data?.userPassword}</h1>
            <h1 className="fs-3">City : {data?.userCity}</h1>
          </div>
          <div
            style={{ height: "80vh" }}
            className="d-flex flex-column justify-content-evenly align-items-center  "
          >
            <h1 className="fs-3">FirstName : {data?.userFirstName}</h1>
            <h1 className="fs-3">Email : {data?.userEmail}</h1>
            <h1 className="fs-3">Gender : {data?.userGender}</h1>
            <h1 className="fs-3">PhoneNumber : {data?.userPhoneNumber}</h1>
          </div>
        </div>
        <h1 className="w-100 text-center text-light ">Role : {data?.role}</h1>
        <div className="d-flex justify-content-center w-100">
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            Back Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
