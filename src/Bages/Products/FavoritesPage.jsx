import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { auth, db } from "../../Componenet/Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import emptyWishlist from "./wishlist.jpg";
import Loading from "../Loading";
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    try {
      const favoritesRef = collection(db, `Users/${user.uid}/favorites`);
      const querySnapshot = await getDocs(favoritesRef);
      if (querySnapshot.empty) {
        return;
      }
      const favoritesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favoritesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  // إزالة المنتج من المفضلة
  const removeFromFavorites = async (productId) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    try {
      const favoriteDocRef = doc(db, `Users/${user.uid}/favorites`, productId);
      await deleteDoc(favoriteDocRef);
      setFavorites((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing from favorites: ", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {favorites.length > 0 ? (
        <div className="d-flex justify-content-center flex-wrap container mb-5 mt-5">
          {favorites.map((data, index) => (
            <div
              style={{ width: "20rem" }}
              key={index}
              className="product__card__card"
            >
              <div className="product__card">
                <div className="product__image m-auto">
                  <img src={data.image} alt="item" className="product__img" />
                </div>
                <div className="product__card__detail">
                  <div className="product__name">
                    <h5 className="fw-bold">{data.category}</h5>
                  </div>
                  <div className="product__description px-2">
                    <span className="fw-bold">{data.title}</span>
                  </div>
                  <div className="product__price">
                    <span>${Math.floor(data.price)}</span>
                  </div>
                  <div className="product__card__action">
                    <button
                      className="bg-transparent border-0"
                      onClick={() => removeFromFavorites(data.id)}
                    >
                      <FaHeart className="fs-4 fw-bolder text-danger" />
                    </button>
                    <button className="bg-transparent border-0">
                      <MdOutlineAddShoppingCart className="fs-4 fw-bolder" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <img
            src={emptyWishlist}
            width="150"
            height="550"
            className="w-100 "
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
