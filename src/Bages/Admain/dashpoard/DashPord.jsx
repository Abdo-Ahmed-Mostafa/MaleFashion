import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Componenet/Firebase/firebase";

const DashPord = ({ product }) => {
  const [value, loadingg, errorr] = useCollection(collection(db, `Users`));
  const lastUser = value && value.docs[value.docs.length - 1].data();
  const [values, loading, error] = useCollection(collection(db, `Products`));
  const lastProducts = values && values.docs[values.docs.length - 1].data();
  console.log(lastProducts);
  const navegiate = useNavigate();

  return (
    <div className="d-flex">
      <div className=" vh-100 colorRight text-light d-flex flex-column justify-content-evenly align-items-center">
        <h1>DashBord</h1>
        <h1>Users</h1>
        <h1>Products</h1>
      </div>
      <div
        style={{ width: "80%" }}
        className=" d-flex justify-content-around align-items-center"
      >
        <div
          style={{ background: "#000015", width: "40%" }}
          className=" text-light rounded p-5  d-flex justify-content-center flex-column align-items-center"
        >
          <h1>Users</h1>
          <h3 className="mt-5">
            Number of Users : {value && value?.docs.length}
          </h3>
          <h3 className="mt-5 mb-5">
            Last Users Registered
            <span className=" text-success d-inline-block  ">
              : {lastUser?.userFirstName}
            </span>
          </h3>
          <Button onClick={() => navegiate("/admin/users")}>Show Users </Button>
        </div>
        <div
          style={{ background: "#000016", width: "40%" }}
          className=" text-light rounded p-5 d-flex justify-content-center flex-column align-items-center  "
        >
          <h1>Products</h1>
          <h3 className="mt-5">Number of Products : {values && values?.docs.length}</h3>
          <h3 className="mt-5  mb-5">
            Last Products Added is :
            <span className=" text-success d-inline-block ">
              {lastProducts?.title}
            </span>
          </h3>

          <Button onClick={() => navegiate("/admin/product")}>
            Show products{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashPord;
