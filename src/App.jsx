import React, { useEffect, useState } from "react";
import Home from "./Bages/home/Home";
import Foter from "./Componenet/Foter/Foter";
import { Routes, Route } from "react-router-dom";
import Singin from "./Bages/Admain/log/Singin";
import Singup from "./Bages/Admain/log/Singup";
import NotFouned from "./Bages/NotFouned";
import Nave from "./Componenet/Nave/Nave";
import Product from "./Bages/Products/Product";
import CardShop from "./Bages/Products/CardShop";
import axios from "axios";
import DashPord from "./Bages/Admain/dashpoard/DashPord";
import ControlUsers from "./Bages/Admain/dashpoard/Users/ControlUsers";
import ViewUsers from "./Bages/Admain/dashpoard/Users/ViewUsers";
import Profile from "./Bages/Admain/dashpoard/Users/Profile";
import ShowProduct from "./Bages/Admain/dashpoard/Products/ShowProduct";
import EdietProduct from "./Bages/Admain/dashpoard/Products/EdietProduct";
import ViweProduct from "./Bages/Admain/dashpoard/Products/ViweProduct";
import AddProduct from "./Bages/Admain/dashpoard/Products/AddProduct";

const App = () => {
  const [addCart, setAddcart] = useState([]);
  const [product, setproduct] = useState([]);
  const [users, setUSers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const addToCart = (detels) => {
    let check = addCart.some((prod) => {
      return prod.id == detels.id;
    });
    if (check) {
    } else {
      const bod = [...addCart, detels];
      setAddcart(bod);
    }
  };
  return (
    <div>
      <Nave singleUser={singleUser} setSingleUser={setSingleUser} />
      <Routes>
        <Route path="/" element={<Home addCart={addCart} />} />
        <Route
          path="/products"
          element={
            <Product
              addToCart={addToCart}
              products={product}
              setproducts={setproduct}
            />
          }
        />
        <Route
          path="/cardshop"
          element={<CardShop addCart={addCart} setAddcart={setAddcart} />}
        />
        <Route path="/singin" element={<Singin addCart={addCart} />} />
        <Route
          path="/admin"
          element={
            singleUser && singleUser.role == "admin" ? (
              <DashPord product={product} users={users} />
            ) : (
              <Singin />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            singleUser && singleUser.role == "admin" ? (
              <ControlUsers users={users} />
            ) : (
              <Singin />
            )
          }
        />
        <Route
          path="/admin/product"
          element={
            singleUser && singleUser.role == "admin" ? (
              <ShowProduct />
            ) : (
              <Singin />
            )
          }
        />
        <Route path="/admin/product/addproduct" element={<AddProduct />} />
        <Route
          path="/admin/product/edietproduct/:productid"
          element={
            singleUser && singleUser.role == "admin" ? (
              <EdietProduct />
            ) : (
              <Singin />
            )
          }
        />
        <Route
          path="/admin/product/viewproduct/:productid"
          element={
            singleUser && singleUser.role == "admin" ? (
              <ViweProduct />
            ) : (
              <Singin />
            )
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin/users/viewuser/:usersid"
          element={
            singleUser && singleUser.role == "admin" ? (
              <ViewUsers />
            ) : (
              <Singin />
            )
          }
        />

        <Route path="/singin/singup" element={<Singup addCart={addCart} />} />
        <Route path="*" element={<NotFouned />} />
      </Routes>
      <Foter />
    </div>
  );
};

export default App;
