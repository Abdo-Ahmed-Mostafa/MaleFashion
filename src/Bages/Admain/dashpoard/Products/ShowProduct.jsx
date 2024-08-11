import axios from "axios";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../../Componenet/Firebase/firebase";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsEmojiWinkFill } from "react-icons/bs";
import { FaRegUser, FaUsers } from "react-icons/fa";
import Loading from "../../../Loading";

const ShowProduct = () => {
  const [value, loadingg, errorr] = useCollection(collection(db, `Products`));

  const navigate = useNavigate();

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
  if (loadingg) return <Loading />;

  return (
    <div className="d-flex bg-light">
      <div style={{ width: "20%" }} className=" bg-yellowColor vh-100 ">
        <div className="m-4">
          <div
            onClick={() => navigate("/admin")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
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
      <div style={{ width: "80%" }}>
        <div className=" text-center mt-5 mx-3 d-flex align-items-center  justify-content-between   ">
          <h3>User-List</h3>
          <Button
            onClick={() => navigate("/admin/product/addproduct")}
            className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <FaRegUser className="mb-1 me-2" />
            Create Product{" "}
          </Button>
        </div>
        <div className="card shadowDashboard mx-5 mt-5 mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 fw-bold text-primary">DataTables</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table  table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr className="text-center ">
                    <th className="text-secondary fw-bold">Image</th>
                    <th className="fw-bold text-secondary">Price</th>
                    <th className="fw-bold text-secondary">Role</th>
                    <th className="fw-bold text-secondary">Operations</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr className="text-center">
                    <th className="fw-bold text-secondary">Image</th>
                    <th className="fw-bold text-secondary">Price</th>
                    <th className="fw-bold text-secondary">Role</th>
                    <th className="fw-bold text-secondary">Operations</th>
                  </tr>
                </tfoot>
                <tbody>
                  {value &&
                    value.docs.map((products, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <img
                            src={products.data().image}
                            alt="Not"
                            width={40}
                            height={40}
                            className="rounded-5"
                          />
                        </td>
                        <td className="fw-bold">{products.data().price} $</td>
                        <td className="fw-bold">{products.data().category}</td>

                        <td>
                          <div className="d-flex justify-content-evenly ">
                            <Button
                              onClick={() =>
                                navigate(
                                  `/admin/product/viewproduct/${products.id}`
                                )
                              }
                            >
                              View
                            </Button>
                            <Button
                              onClick={() =>
                                navigate(
                                  `/admin/product/edietproduct/${products.id}`
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
{
  /*
    <div className="d-flex">
      <div style={{ width: "20%" }} className=" bg-yellowColor vh-100 ">
        <div className="m-4">
          <div
            onClick={() => navigate("/admin")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
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
      <div className="text-center mt-5" style={{ width: "80%" }}>
        <h1>Products</h1>
        <Button
          className="mt-4"
          onClick={() => navigate("/admin/product/addproduct")}
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
                            navigate(
                              `/admin/product/viewproduct/${products.id}`
                            )
                          }
                        >
                          View
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(
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
  
  */
}
