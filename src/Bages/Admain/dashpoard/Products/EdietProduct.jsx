import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Componenet/Firebase/firebase";
import { BsEmojiWinkFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "../../../Loading";

const EditProduct = () => {
  const [editProd, setEditProd] = useState({});
  const { productid } = useParams();
  const navigate = useNavigate();
  const [values, loading, error] = useDocument(
    doc(db, `Products`, `${productid}`)
  );

  useEffect(() => {
    if (values) {
      setEditProd(values.data());
    }
  }, [values]);

  const handleEdit = (event) => {
    event.preventDefault();
    updateDoc(doc(db, "Products", productid), editProd);
    navigate(-1);
  };

  if (loading) return <Loading />;

  return (
    <div className="d-flex justify-content-center align-items-center w-100 ">
      <div style={{ width: "20%" }} className="bg-yellowColor vh-100 ">
        <div className="m-4">
          <div
            onClick={() => navigate("/admin")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
            <BsEmojiWinkFill className="fs-1 text-white" />
            <h4 className="mt-1 text-white"> </h4>
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
      <div className="container shadow bg-white w-50 text-light rounded">
        <Form
          onSubmit={handleEdit}
          className="mb-3 mt-3 pt-3 pb-3 fw-bold container"
        >
          <Form.Group className="w-75 ms-5">
            <Form.Label className="text-secondary fw-bold">
              Product Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={editProd?.title || ""}
              className="border-2 border-warning"
              onChange={(e) =>
                setEditProd({ ...editProd, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="w-75 ms-5">
            <Form.Label className="text-secondary fw-bold">
              Product price
            </Form.Label>
            <Form.Control
              type="text"
              className="border-2 border-warning"
              placeholder="Product price"
              value={editProd?.price || ""}
              onChange={(e) =>
                setEditProd({ ...editProd, price: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-flex ms-1 justify-content-around">
            <Form.Group className="w-25">
              <Form.Label className="text-secondary fw-bold">
                Product category
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product category"
                value={editProd?.category || ""}
                onChange={(e) =>
                  setEditProd({ ...editProd, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label className="text-secondary fw-bold">
                Product description
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product description"
                value={editProd?.description || ""}
                onChange={(e) =>
                  setEditProd({ ...editProd, description: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex ms-1 justify-content-around">
            <Form.Group className="w-25">
              <Form.Label className="text-secondary fw-bold">
                Product image
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product image"
                value={editProd?.image || ""}
                onChange={(e) =>
                  setEditProd({ ...editProd, image: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label className="text-secondary fw-bold">
                Product rate
              </Form.Label>
              <Form.Control
                type="text"
                className="border-2 border-warning"
                placeholder="Product rate"
                value={editProd?.rating || ""}
                onChange={(e) =>
                  setEditProd({ ...editProd, rating: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button type="submit" variant="outline-warning">
              Edit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
