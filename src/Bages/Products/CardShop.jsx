import React, { useState } from "react";
import backImage from "./empty-shopping.jpg";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { PiIdentificationCardBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Componenet/Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const CardShop = ({ addCart, loading }) => {
  const [user] = useAuthState(auth);

  const increment = async (item) => {
    const itemRef = doc(db, `Users/${user.uid}/cart`, item.id);
    try {
      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        const newItemCount = (docSnapshot.data().itemes || 0) + 1;
        await updateDoc(itemRef, { itemes: newItemCount });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const decrement = async (item) => {
    const itemRef = doc(db, `Users/${user.uid}/cart`, item.id);
    try {
      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        const currentItemCount = docSnapshot.data().itemes || 0;
        if (currentItemCount > 1) {
          const newItemCount = currentItemCount - 1;
          await updateDoc(itemRef, { itemes: newItemCount });
        } else {
          console.log("Cannot decrement below 1");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const navigate = useNavigate();
  const deleteData = async (item) => {
    const itemRef = doc(db, `Users/${user.uid}/cart`, item.id);
    try {
      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        await deleteDoc(itemRef);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      {addCart.length === 0 ? (
        <section className="d-flex container justify-content-evenly">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div className="w-100 d-flex justify-content-center">
              <img src={backImage} width="35%" alt="" />
            </div>
            <Button
              onClick={() => navigate("/products")}
              className="text-dark fw-bold mb-5"
              variant="success"
            >
              Shop Now <GiShoppingCart />
            </Button>
          </div>
          <div className="bg-secondary-subtle p-3 d-flex flex-column h-100 align-items-center w-100 rounded my-5">
            <h5>CART TOTAL</h5>
            <div className="d-flex w-100 justify-content-between">
              <h5>$</h5>
              <h3 className="m-0">
                <PiIdentificationCardBold />
              </h3>
            </div>
            <Button className="w-100">Pay</Button>
          </div>
        </section>
      ) : (
        <div className="d-flex flex-column flex-lg-row justify-content-between">
          <div className="d-flex flex-column container mb-5 mt-5">
            {addCart.map((item, index) => (
              <div
                key={index}
                style={{ width: "100%" }}
                className="d-flex justify-content-between text-center flex-column flex-sm-row align-items-center border-bottom border-3 border-dark mb-3"
              >
                <img src={item.image} alt="" width="15%" className="mb-3" />
                <div className="ms-3">
                  <h5>{item.title}</h5>
                  <h5>${Math.floor(item.price)}</h5>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Button
                    onClick={() => decrement(item)}
                    className="me-4 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    -
                  </Button>
                  <h3 className="me-4 mt-2">{item.itemes}</h3>
                  <Button
                    onClick={() => increment(item)}
                    className="me-4 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    +
                  </Button>
                </div>
                <div className="mb-3">
                  <h3>${Math.floor(item.price * item.itemes)}</h3>
                </div>
                <div className="mb-3">
                  <Button
                    onClick={() => deleteData(item)}
                    className="me-5 ms-5 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-secondary-subtle p-3 d-flex flex-column h-75 align-items-center rounded my-5">
            <h5>CART TOTAL</h5>
            <div className="d-flex w-100 justify-content-between">
              <h5>$</h5>
              <h3 className="m-0">
                <PiIdentificationCardBold />
              </h3>
            </div>
            <Button className="w-100">Pay</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardShop;
