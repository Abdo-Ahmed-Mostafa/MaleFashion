import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "../../../Loading";
import { BsEmojiWinkFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const AddProduct = () => {
  const [detailsProduct, setDetailsProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });
  const navigate = useNavigate();

  const [value, loadingg, errorr] = useCollection(collection(db, `Products`));
  // console.log(value && value.docs);
  const sendData = (e) => {
    e.preventDefault();

    addDoc(collection(db, "Products"), {
      ...detailsProduct,
      items: 0,
      id: value && value.docs.length + 1,
    });
    navigate(-1);
    console.log("test");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
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
      <div className=" container  bg-yellow2 w-75 text-dark rounded-2 ">
        <Form
          onSubmit={(e) => sendData(e)}
          className="mb-3 mt-3 pt-3 pb-3 fw-bold container "
        >
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <Form.Group className="w-75 ms-5">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product Name"
                value={detailsProduct.title}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="w-75 ms-5">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product price"
                value={detailsProduct.price}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>
          <div className=" d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product category</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product category"
                value={detailsProduct.category}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product description"
                value={detailsProduct.description}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product image"
                value={detailsProduct.image}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    image: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product rate</Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product rate"
                value={detailsProduct.rating}
                onChange={(e) =>
                  setDetailsProduct({
                    ...detailsProduct,
                    rating: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button type="submit" variant="outline-warning text-dark fw-bold">
              Send Data
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
