import React, { useState } from "react";
import backImage from "./empty-shopping.jpg";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { PiIdentificationCardBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";

const CardShop = ({ addCart, setAddcart }) => {
  const increment = (added) => {
    let puls = addCart.map((prod) => {
      if (prod.id == added.id) {
        prod.itemes++;
      }
      return prod;
      // console.log(prod);
    });

    setAddcart(puls);
  };
  const decrement = (added) => {
    let minus = addCart.map((prod) => {
      if (prod.id == added.id && prod.itemes > 0) {
        prod.itemes--;
      }
      return prod;
    });

    setAddcart(minus);
  };
  const deleteData = (added) => {
    const del = addCart.filter((data) => {
      if (data.id != added.id) {
        return data;
      }
    });
    setAddcart(del);
  };
  return (
    <div>
      {addCart.length == 0 ? (
        <section className="d-flex container ">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div className=" w-100  d-flex justify-content-center   ">
              <img src={backImage} width="35%" alt="" />
            </div>
            <Button className="text-dark fw-bold mb-5 " variant="success">
              Shop Now <GiShoppingCart />
            </Button>
          </div>

          <div
            style={{ height: "18vh", width: "35%" }}
            className=" bg-secondary-subtle  p-3 rounded  mt-5 "
          >
            <h5>CART TOTAl</h5>
            <div className="d-flex w-100 justify-content-between ">
              <h5>$</h5>
              <h3 className="m-0">
                <PiIdentificationCardBold />
              </h3>
            </div>

            <Button className="w-100">Pay</Button>
          </div>
        </section>
      ) : (
        <div className="d-flex">
          <div className="d-flex justify-content-between  flex-column   container mb-5 mt-5 ">
            {addCart.map((added, indexs) => (
              <div
                key={indexs}
                style={{ width: "75%" }}
                className="d-flex justify-content-evenly align-items-center border-bottom  border-3 border-dark   "
              >
                <div className="d-flex align-items-center ">
                  <img src={added.image} alt="" width="20%" className="mb-3" />
                  <div className="ms-3">
                    <h5>{added.title}</h5>
                    <h5>${Math.floor(added.price)}</h5>
                  </div>
                </div>

                <div className="d-flex">
                  <Button
                    onClick={() => decrement(added)}
                    className="me-4 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    -
                  </Button>
                  <h3 className="me-4 mt-2">{added.itemes}</h3>
                  <Button
                    onClick={() => increment(added)}
                    className="me-4 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    +
                  </Button>
                </div>
                <div>
                  <h3>${Math.floor(+(added.price * added.itemes))}</h3>
                </div>
                <div>
                  <Button
                    onClick={() => deleteData(added)}
                    className="me-5 ms-5 bg-transparent text-dark fw-bold fs-4 border-0"
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ height: "18vh", width: "20%" }}
            className=" bg-secondary-subtle  p-3 rounded  mt-5 me-5 "
          >
            <h5>CART TOTAl</h5>
            <div className="d-flex w-100 justify-content-between ">
              <h5>
                $
                {addCart
                  .map((pri) => {
                    return pri.itemes * pri.price;
                  })
                  .reduce((firstPrice, secondPrice) =>
                    Math.floor(+firstPrice + secondPrice)
                  )}
              </h5>
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
/*

 

*/
