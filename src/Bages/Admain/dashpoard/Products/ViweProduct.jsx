import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";
import { doc } from "firebase/firestore";
const ViweProduct = () => {
  const navegite = useNavigate();

  const { productid } = useParams();
  const [values, loadinggs, errorrs] = useDocument(
    doc(db, `Products`, `${productid}`)
  );
  const data = values && values.data();
  console.log(data);
  return (
    <div>
      <div className=" bg-secondary vh-100 d-flex justify-content-center algin-iteme-center">
        <Card data-bs-theme="dark" className="m-5" style={{ width: "20rem" }}>
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
            <Button variant="success" onClick={() => navegite(-1)}>
              Back Admin Bage
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ViweProduct;
