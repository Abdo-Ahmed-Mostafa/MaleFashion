import React from "react";
import TopHome from "./TopHome/TopHome";
import CenterHome from "./CenterHome/CenterHome";
import EndHome from "./EndHome/EndHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Componenet/Firebase/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";

const Home = () => {
  // get all users
  // const [user, loading, error] = useAuthState(auth);
  // const [value, loadingg, errorr] = useCollection(collection(db, `Users`));
  // const [values, loadinggs, errorrs] = useDocument(
  //   doc(db, `Users`, `${user.uid}`)
  // );

  // console.log(values.data());
  return (
    <>
      <TopHome />
      <CenterHome />
      <EndHome />
    </>
  );
};
export default Home;
