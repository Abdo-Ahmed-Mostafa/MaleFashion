import React, { useEffect, useState } from "react";
import Home from "./Bages/home/Home";
import Foter from "./Componenet/Foter/Foter";
import { Routes, Route, useNavigate } from "react-router-dom";
import Singin from "./Bages/Admain/log/Singin";
import Singup from "./Bages/Admain/log/Singup";
import NotFouned from "./Bages/NotFouned";
import Nave from "./Componenet/Nave/Nave";
import Product from "./Bages/Products/Product";
import CardShop from "./Bages/Products/CardShop";
import DashPord from "./Bages/Admain/dashpoard/DashPord";
import ControlUsers from "./Bages/Admain/dashpoard/Users/ControlUsers";
import ViewUsers from "./Bages/Admain/dashpoard/Users/ViewUsers";
import Profile from "./Bages/Admain/dashpoard/Users/Profile";
import ShowProduct from "./Bages/Admain/dashpoard/Products/ShowProduct";
import EdietProduct from "./Bages/Admain/dashpoard/Products/EdietProduct";
import ViweProduct from "./Bages/Admain/dashpoard/Products/ViweProduct";
import AddProduct from "./Bages/Admain/dashpoard/Products/AddProduct";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Componenet/Firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import FavoritesPage from "./Bages/Products/FavoritesPage";

const App = () => {
  const [addCart, setAddCart] = useState([]);
  const [user] = useAuthState(auth);
  const [singleUser, setSingleUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchSingleUser = async () => {
        try {
          if (user.uid) {
            const userRef = doc(db, `Users/${user.uid}`);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              setSingleUser(userDoc.data());
            } else {
              console.log("No such document!");
            }
          } else {
            console.error("User ID is null or undefined.");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchSingleUser();
    } else {
      setSingleUser(null);
      setAddCart([]);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const cartRef = collection(db, `Users/${user.uid}/cart`);
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const cartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAddCart(cartItems);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/singin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <Nave addCart={addCart} singleUser={singleUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home addCart={addCart} />} />
        <Route path="/products" element={<Product />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route
          path="/cardshop"
          element={
            <CardShop
              addCart={addCart}
              setAddCart={setAddCart}
              loading={loading}
            />
          }
        />
        <Route path="/singin" element={<Singin addCart={addCart} />} />
        <Route
          path="/admin"
          element={singleUser?.role === "admin" ? <DashPord /> : <Singin />}
        />
        <Route
          path="/admin/users"
          element={singleUser?.role === "admin" ? <ControlUsers /> : <Singin />}
        />
        <Route
          path="/admin/product"
          element={singleUser?.role === "admin" ? <ShowProduct /> : <Singin />}
        />
        <Route path="/admin/product/addproduct" element={<AddProduct />} />
        <Route
          path="/admin/product/edietproduct/:productid"
          element={singleUser?.role === "admin" ? <EdietProduct /> : <Singin />}
        />
        <Route
          path="/admin/product/viewproduct/:productid"
          element={singleUser?.role === "admin" ? <ViweProduct /> : <Singin />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin/users/viewuser/:usersid"
          element={singleUser?.role === "admin" ? <ViewUsers /> : <Singin />}
        />
        <Route path="/singin/singup" element={<Singup addCart={addCart} />} />
        <Route path="*" element={<NotFouned />} />
      </Routes>
      <Foter />
    </div>
  );
};

export default App;
