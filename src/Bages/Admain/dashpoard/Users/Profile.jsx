import axios from "axios";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../Componenet/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [users, setUSers] = useState([]);
  const [abdo, setabdo] = useState(null);
  // const getUsers = () => {
  //   axios({
  //     method: "get",
  //     url: `http://localhost:9000/users`,
  //   }).then((data) => setUSers(data.data));
  // };
  // const findeUsers = users.find((user) => {
  //   return localStorage.useremail == user.useremail;
  // });
  // const showprofile = findeUsers;
  console.log(typeof users);
  const fiendUsers = async () => {
    auth.onAuthStateChanged(async (user) => {
      const userUid = user && user.uid && user.uid;
      const docRef = doc(db, "Users", userUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUSers(docSnap.data());
        localStorage.role = docSnap.data().role;
        localStorage.userimage = docSnap.data().userimage;
        localStorage.useremail = docSnap.data().useremail;
      }
    });
  };
  useEffect(() => {
    fiendUsers();
  }, []);
  return (
    <div>
      {typeof users == "object" && (
        <div className="d-flex vh-100 bg-success   ">
          <div className="w-25 border-end border-3 border-light ">
            <img src={users.userimage} width="99%" alt="ImgNotFound" />
          </div>

          <div className="w-75 me-5 ms-5 ">
            <div className=" d-flex justify-content-between containe text-light">
              <div
                style={{ height: "80vh" }}
                className="d-flex flex-column justify-content-evenly align-items-center  "
              >
                <h1>UserName : {users.username}</h1>
                <h1>LastName : {users.userlastname}</h1>
                <h1>Password : {users.userpassword}</h1>
                <h1>City : {users.usercity}</h1>
              </div>
              <div
                style={{ height: "80vh" }}
                className="d-flex flex-column justify-content-evenly align-items-center  "
              >
                <h1>FirstName : {users.userfirstname}</h1>
                <h1>Email : {users.useremail}</h1>
                <h1>Gender : {users.usergender}</h1>
                <h1>PhoneNumber : {users.userphoneNumber}</h1>
              </div>
            </div>
            <h1 className="w-100 text-center text-light ">
              Role : {users.role}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
