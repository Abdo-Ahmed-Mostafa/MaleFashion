import React from "react";
import { FaRegCalendar } from "react-icons/fa";

function Card({ title, value, color }) {
  return (
    <div className="w-100 mt-5 col " style={{ height: "15vh" }}>
      <div
        className={`card border-4 border-top-0 border-bottom-0 border-end-0 border-${color}  shadow h-100 py-2`}
      >
        <div className="card-body">
          <div className="d-flex  align-items-center justify-content-between">
            <div className=" me-2">
              <div
                className={`text-xs fw-bold text-${color} text-uppercase mb-1`}
              >
                {title}
              </div>
              <div className="h5 mb-0 fw-bold text-secondary">{value}</div>
            </div>
            <div className="">
              <FaRegCalendar style={{ color: "#dddfeb" }} className="fs-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
