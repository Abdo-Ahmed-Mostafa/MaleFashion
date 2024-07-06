import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";

const EdietProduct = () => {
  const [edItprod, setEdietProd] = useState([]);
  const { productid } = useParams();
  const navigate = useNavigate();
  const getprod = () => {
    axios({
      method: "get",
      url: `http://localhost:9000/products/${productid}`,
    }).then((data) => setEdietProd(data.data));
  };
  const ediet = (prevent) => {
    prevent.preventDefault();
    updateDoc(doc(db, "Products", prevent.id), {
      

    });
    navigate(-1);
  };

  useEffect(() => {
    getprod();
  }, []);

  return (
    <div>
      <div className=" container  bg-dark w-75 text-light rounded ">
        <Form
          onSubmit={(prevent) => ediet(prevent)}
          className="mb-3 mt-3 pt-3 pb-3 fw-bold container  "
        >
          <Form.Group className="w-75 ms-5">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={edItprod.title}
              onChange={(e) =>
                setEdietProd({ ...edItprod, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="w-75 ms-5">
            <Form.Label>Product price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product price"
              value={edItprod.price}
              onChange={(e) =>
                setEdietProd({ ...edItprod, price: e.target.value })
              }
            />
          </Form.Group>
          <div className="one d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product category"
                value={edItprod.category}
                onChange={(e) =>
                  setEdietProd({ ...edItprod, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product description"
                value={edItprod.description}
                onChange={(e) =>
                  setEdietProd({ ...edItprod, description: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-around ">
            <Form.Group className="w-25">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product image"
                value={edItprod.image}
                onChange={(e) =>
                  setEdietProd({ ...edItprod, image: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Product rate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product rate"
                value={edItprod.rating}
                onChange={(e) =>
                  setEdietProd({ ...edItprod, rating: e.target.value })
                }
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button type="submit">Ediet</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EdietProduct;
