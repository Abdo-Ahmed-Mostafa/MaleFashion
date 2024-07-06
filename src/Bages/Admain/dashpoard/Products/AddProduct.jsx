import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [edItprod, setEdietProd] = useState([]);
  const navigate = useNavigate();

  const [value, loadingg, errorr] = useCollection(collection(db, `Products`));
  // console.log(value && value.docs);
  const sendData = (e) => {
    e.preventDefault();
    const test = new Date().getTime;
    addDoc(collection(db, "Products"), {
      title,
      price,
      description,
      category,
      image,
      rating,
      items: 0,
      id: value && value.docs.length + 1,
    });
    // navigate("/products");
    navigate(-1);
  };

  return (
    <div>
      <div className=" container  bg-dark w-75 text-light rounded-2 ">
        <Form
          onSubmit={(e) => sendData(e)}
          className="mb-3 mt-3 pt-3 pb-3 fw-bold container "
        >
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <Form.Group className="w-75 ms-5">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="w-75 ms-5">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className=" d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product rate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product rate"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button type="submit">Send Data</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
