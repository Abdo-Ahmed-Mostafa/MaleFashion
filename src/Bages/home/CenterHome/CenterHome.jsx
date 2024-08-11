import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../Componenet/Firebase/firebase";

const CenterHome = () => {
  const [values, loading, error] = useCollection(collection(db, `Products`));
  const allProducts = values?.docs;
  const filteration =
    allProducts &&
    allProducts.filter((data) => {
      return data.data().category.startsWith("w");
    });
  return (
    <div>
      <div className="container d-flex  flex-wrap justify-content-center  align-items-center my-5">
        {filteration &&
          filteration.map((data, index) => (
            <div key={index} className="product__card__card">
              <div className="product__card">
                <div className="product__image m-auto">
                  <img
                    src={data.data().image}
                    alt="item"
                    className="product__img"
                  />
                </div>
                <div className="product__card__detail ">
                  <div className="product__name">
                    <h5 className="fw-bold">{data.data().category}</h5>
                  </div>
                  <div className="product__description px-2">
                    <span className="fw-bold">{data.data().title}</span>
                  </div>
                  <div className="product__price">
                    <span>${data.data().price}</span>
                  </div>
                  <div className="product__card__action">
                    <button className="bg-transparent border-0">
                      <FaRegHeart className="fs-4 fw-bolder" />
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
    </div>
  );
};

export default CenterHome;
