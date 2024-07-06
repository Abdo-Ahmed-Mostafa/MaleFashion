import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, db } from "../../../../Componenet/Firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const ControlUsers = () => {
  const [users, setUSers] = useState([]);
  const [updetdata, setupdetdata] = useState(true);
  const navegiat = useNavigate();
  const [userId, setUserId] = useState([]);

  const [value, loadingg, errorr] = useCollection(collection(db, `Users`));
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

  return (
    <div className="d-flex">
      <div className=" vh-100 colorRight text-light d-flex flex-column justify-content-evenly align-items-center">
        <h1>DashBord</h1>
        <h1>Users</h1>
        <h1>Products</h1>
      </div>
      <div style={{ width: "80%" }}>
        <div className=" text-center mt-5  ">
          <h1>Users</h1>
          <Button
            variant="success"
            onClick={() => navegiat("/singin/singup")}
            className="mt-5"
          >
            Add New User
          </Button>
        </div>
        <div className=" container mt-5 text-center">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {/* {users.map((UserData, index) => (
                <tr key={index} className="text-light">
                  <td>{UserData.username}</td>
                  <td>{UserData.role}</td>
                  <td>
                    <div className="d-flex justify-content-evenly ">
                      <Button
                        onClick={() =>
                          navegiat(`/admin/users/viewuser/${index + 1}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        onClick={() =>
                          navegiat(`/admin/users/edietuser/${index + 1}`)
                        }
                        variant="warning"
                      >
                        Edite
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => Deleted(UserData)}
                      >
                        Del
                      </Button>
                      {UserData.role == "admin" ? (
                        <Button
                          onClick={() => RemoveAdmin(UserData)}
                          variant="success"
                        >
                          Remove Admin
                        </Button>
                      ) : (
                        UserData.role == "member" && (
                          <Button
                            variant="secondary"
                            onClick={() => MakeAdmin(UserData)}
                          >
                            Make Admin
                          </Button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))} */}
              {value &&
                value.docs.map((UserData, index) => (
                  <tr key={index} className="text-light">
                    <td>{UserData.data().userName}</td>
                    <td>{UserData.data().role}</td>
                    <td>
                      <div className="d-flex justify-content-evenly ">
                        <Button
                          onClick={() =>
                            navegiat(
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
                            variant="success"
                          >
                            Remove Admin
                          </Button>
                        ) : (
                          UserData.data().role == "member" && (
                            <Button
                              variant="secondary"
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
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ControlUsers;
