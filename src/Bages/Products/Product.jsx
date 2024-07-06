import React from "react";

import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../Componenet/Firebase/firebase";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import Loading from "../Loading";

const Product = () => {
  const [value, loadingg, errorr] = useCollection(collection(db, `Products`));
  console.log(value && value.docs);

  return (
    <div className=" fw-bold ">
      <div className=" container w-100    ">
        <div className=" row d-flex justify-content-center align-items-center gap-3 pt-3 pb-5 ">
          {loadingg ? (
            <Loading />
          ) : (
            value &&
            value.docs.map((data, index) => (
              <div
                style={{ width: "20rem" }}
                key={index}
                className="product__card__card "
              >
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
                      <button className="bg-transparent border-0 ">
                        <FaRegHeart className="fs-4 fw-bolder" />
                      </button>
                      <button className="bg-transparent border-0">
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
