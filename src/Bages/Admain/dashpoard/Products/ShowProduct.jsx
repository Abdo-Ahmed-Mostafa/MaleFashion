import axios from "axios";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../../Componenet/Firebase/firebase";

const ShowProduct = () => {
  const [product, setproduct] = useState([]);
  const [updetdata, setupdetdata] = useState(true);
  const [value, loadingg, errorr] = useCollection(collection(db, `Products`));
  const allProduct = value && value.docs;

  // console.log(allProduct && allProduct.map((data) => data.data()));

  const navegiat = useNavigate();

  const Deleted = (products) => {
    Swal.fire({
      title: `${products.data().title} Will Be Deleted !!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "No",
    }).then((data) => {
      if (data.isConfirmed) {
        deleteDoc(doc(db, "Products", products.id));
      }
    });
  };

  return (
    <div className="d-flex">
      <div className=" vh-100 colorRight text-light d-flex flex-column justify-content-evenly align-items-center">
        <h1>DashBord</h1>
        <h1>Users</h1>
        <h1>Products</h1>
      </div>
      <div className="text-center mt-5" style={{ width: "80%" }}>
        <h1>Products</h1>
        <Button
          className="mt-4"
          onClick={() => navegiat("/admin/product/addproduct")}
        >
          Add New Product
        </Button>
        <div className=" container mt-5 text-center">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {allProduct &&
                allProduct.map((products, index) => (
                  <tr key={index} className="text-light">
                    <td width="20%">
                      <img
                        className="rounded-4"
                        src={products.data().image}
                        width="15%"
                        alt=""
                      />
                    </td>
                    <td>{Math.round(products.data().price)}</td>
                    <td>
                      <div className="d-flex justify-content-evenly ">
                        <Button
                          onClick={() =>
                            navegiat(
                              `/admin/product/viewproduct/${products.id}`
                            )
                          }
                        >
                          View
                        </Button>
                        <Button
                          onClick={() =>
                            navegiat(
                              `/admin/product/edietproduct/${
                                products.data().id
                              }`
                            )
                          }
                          variant="warning"
                        >
                          Edite
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => Deleted(products)}
                        >
                          Del
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
