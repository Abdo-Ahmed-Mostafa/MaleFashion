import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";
import { doc } from "firebase/firestore";
import Loading from "../../../Loading";
import { BsEmojiWinkFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
const ViweProduct = () => {
  const navigate = useNavigate();

  const { productid } = useParams();
  const [values, loadinggs, errorrs] = useDocument(
    doc(db, `Products`, `${productid}`)
  );
  const data = values && values.data();
  // console.log(data);

  if (loadinggs) return <Loading />;

  return (
    <div className="vh-100 d-flex  align-items-center">
      <div style={{ width: "20%" }} className=" bg-yellowColor vh-100 ">
        <div className="m-4">
          <div className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom">
            <BsEmojiWinkFill className="fs-1 text-white  " />
            <h4 className="mt-1 text-white">Dashboard</h4>
          </div>
          <div
            onClick={() => navigate("/admin/product")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
            <MdProductionQuantityLimits className="fs-3 mt-2 text-white" />

            <h4 className="mt-1 text-white">Products</h4>
          </div>
          <div
            onClick={() => navigate("/admin/users")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
            <FaUsers className="fs-3 mt-2 text-white" />

            <h4 className="mt-1 text-white">Users</h4>
          </div>
        </div>
      </div>
      {/* <Card data-bs-theme="dark" className="m-5" style={{ width: "20rem" }}>
          <Card.Img
            variant="top"
            className="pt-3"
            height={225}
            src={`${data?.image}`}
          />
          <Card.Body>
            <Card.Title>{data?.title}</Card.Title>
            <Card.Text> {data?.description} </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Price {data?.price} $</ListGroup.Item>
            <ListGroup.Item>Rating {data?.rating} </ListGroup.Item>
            <ListGroup.Item>Category {data?.category} </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="success" onClick={() => navigate(-1)}>
              Back Admin Bage
            </Button>
          </Card.Body>
        </Card> */}
      <div className="w-75 mx-3 d-flex gap-5 ">
        <img
          src={`${data?.image}`}
          className="ms-5"
          style={{ width: "40%"  , height:"70%"}}
          alt=""
        />
        <div className="d-flex flex-column gap-4">
          <h3 className="colorYellow">{data?.title}</h3>
          {/* <h3>{data?.description}</h3> */}
          <div className="fs-4 fw-bold colorYellow pointer  d-flex">
            <ReadMoreReact
              text={`description : ${data?.description}`}
              min={150}
              ideal={150}
              max={170}
              className="fs-3"
              readMoreText={`click here to read more`}
            />
          </div>
          <h3 className="colorYellow">Price : {data?.price}</h3>
          <h3 className="colorYellow">Rating : {data?.rating}</h3>
          <h3 className="colorYellow">Category : {data?.category}</h3>
        </div>
      </div>
    </div>
  );
};

export default ViweProduct;
