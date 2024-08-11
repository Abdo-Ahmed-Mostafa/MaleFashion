import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, db } from "../../../../Componenet/Firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsEmojiWinkFill } from "react-icons/bs";
import { FaUsers, FaRegUser } from "react-icons/fa";
import Loading from "../../../Loading";
import avatarImage from "../../../../avatar-icon-vector-illustration.jpg";

const ControlUsers = () => {
  const [updetdata, setupdetdata] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState([]);

  const [value, loading, error] = useCollection(collection(db, `Users`));
  console.log(value && value.docs);

  const MakeAdmin = (UserData) => {
    updateDoc(doc(db, "Users", UserData.id), {
      role: UserData.role == "admin" ? "member" : "admin",
    });
  };

  const Deleted = (UserData) => {
    Swal.fire({
      title: `${UserData.userName} Will Be Deleted !!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "No",
    }).then((data) => {
      if (data.isConfirmed) {
        deleteDoc(doc(db, "Users", UserData.id));
      }
      setupdetdata(!updetdata);
    });
  };
  if (loading) {
    return <Loading />;
  }
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
            onClick={() => navigate("/singin/singup")}
            className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <FaRegUser className="mb-1 me-2" />
            Create User{" "}
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
                    <th className="fw-bold text-secondary">Name</th>
                    <th className="fw-bold text-secondary">Role</th>
                    <th className="fw-bold text-secondary">Make Admin</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr className="text-center">
                    <th className="fw-bold text-secondary">Image</th>
                    <th className="fw-bold text-secondary">Name</th>
                    <th className="fw-bold text-secondary">Role</th>
                    <th className="fw-bold text-secondary">Make Admin</th>
                  </tr>
                </tfoot>
                <tbody>
                  {value &&
                    value.docs.map((UserData, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <img
                            src={UserData.data().userImage}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-5"
                            onError={(e) => {
                              e.target.src = avatarImage;
                            }}
                          />
                        </td>
                        <td>{UserData.data().userName}</td>
                        <td>{UserData.data().role}</td>

                        <td>
                          <div className="d-flex justify-content-evenly ">
                            <Button
                              onClick={() =>
                                navigate(
                                  `/admin/users/viewuser/${UserData.data().id}`
                                )
                              }
                            >
                              View
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => Deleted(UserData.data())}
                            >
                              Del
                            </Button>
                            {UserData.data().role == "admin" ? (
                              <Button
                                onClick={() => MakeAdmin(UserData.data())}
                                variant="info"
                              >
                                Remove Admin
                              </Button>
                            ) : (
                              UserData.data().role == "member" && (
                                <Button
                                  variant="dark"
                                  onClick={() => MakeAdmin(UserData.data())}
                                >
                                  Make Admin
                                </Button>
                              )
                            )}
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

export default ControlUsers;
