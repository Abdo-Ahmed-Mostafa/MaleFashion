import React, { useState, useEffect } from "react";
import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../Componenet/Firebase/firebase";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Loading from "../Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Componenet/Firebase/firebase";
import Swal from "sweetalert2";

const Product = () => {
  const [value, loading, error] = useCollection(collection(db, `Products`));
  const [user] = useAuthState(auth); // الحصول على المستخدم الحالي
  const [favorites, setFavorites] = useState([]); // حالة لتخزين المنتجات المفضلة
  const addToCart = async (product) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You need to be logged in to add items to your cart.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!user.uid) {
      console.error("User ID is null or undefined.");
      return;
    }

    if (!product || !product.id) {
      console.error("Product or product ID is missing.");
      return;
    }

    try {
      const cartRef = doc(db, `Users/${user.uid}/cart`, product.id);
      await setDoc(cartRef, {
        ...product,
        itemes: 1,
      });
    } catch (e) {
      console.error("Error adding to cart: ", e);
    }
  };
  // جلب المنتجات المفضلة عند تحميل المكون
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const favoritesRef = collection(db, `Users/${user.uid}/favorites`);
        const querySnapshot = await getDocs(favoritesRef);
        const favoritesArray = querySnapshot.docs.map((doc) => doc.id);
        setFavorites(favoritesArray);
      } catch (error) {
        console.error("Error fetching favorites: ", error);
      }
    };

    fetchFavorites();
  }, [user]);

  // دالة لإضافة المنتج إلى المفضلة
  const addToFavorites = async (product) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You need to be logged in to add items to your favorites.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!user.uid) {
      console.error("User ID is null or undefined.");
      return;
    }

    if (!product || !product.id) {
      console.error("Product or product ID is missing.");
      return;
    }

    try {
      const favoritesRef = doc(db, `Users/${user.uid}/favorites`, product.id);
      await setDoc(favoritesRef, {
        ...product,
        addedAt: new Date(),
      });
      setFavorites((prev) => [...prev, product.id]); // إضافة المنتج إلى الحالة
    } catch (e) {
      console.error("Error adding to favorites: ", e);
    }
  };

  // دالة لإزالة المنتج من المفضلة
  const removeFromFavorites = async (productId) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You need to be logged in to remove items from your favorites.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!user.uid) {
      console.error("User ID is null or undefined.");
      return;
    }

    try {
      const favoriteDocRef = doc(db, `Users/${user.uid}/favorites`, productId);
      await deleteDoc(favoriteDocRef);
      setFavorites((prev) => prev.filter((id) => id !== productId)); // إزالة المنتج من الحالة
    } catch (e) {
      console.error("Error removing from favorites: ", e);
    }
  };

  const toggleFavorite = (product) => {
    if (favorites.includes(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="fw-bold">
      <div className="container w-100">
        <div className="row d-flex justify-content-center align-items-center gap-3 pt-3 pb-5">
          {loading ? (
            <Loading />
          ) : (
            value &&
            value.docs.map((data, index) => (
              <div
                style={{ width: "20rem" }}
                key={index}
                className="product__card__card"
              >
                <div className="product__card">
                  <div className="product__image m-auto">
                    <img
                      src={data.data().image}
                      alt="item"
                      className="product__img"
                    />
                  </div>
                  <div className="product__card__detail">
                    <div className="product__name">
                      <h5 className="fw-bold">{data.data().category}</h5>
                    </div>
                    <div className="product__description px-2">
                      <span className="fw-bold">{data.data().title}</span>
                    </div>
                    <div className="product__price">
                      <span>${Math.floor(data.data().price)}</span>
                    </div>
                    <div className="product__card__action">
                      <button
                        onClick={() =>
                          toggleFavorite({
                            id: data.id,
                            title: data.data().title,
                            price: data.data().price,
                            image: data.data().image,
                            category: data.data().category,
                            description: data.data().description,
                          })
                        }
                        className="bg-transparent border-0"
                      >
                        {favorites.includes(data.id) ? (
                          <FaHeart className="fs-4 fw-bolder text-danger" />
                        ) : (
                          <FaRegHeart className="fs-4 fw-bolder" />
                        )}
                      </button>
                      <button
                        className="bg-transparent border-0"
                        onClick={() =>
                          addToCart({
                            id: data.id,
                            title: data.data().title,
                            price: data.data().price,
                            image: data.data().image,
                          })
                        }
                      >
                        <MdOutlineAddShoppingCart className="fs-4 fw-bolder" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
