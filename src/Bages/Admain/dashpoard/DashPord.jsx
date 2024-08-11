import { collection } from "firebase/firestore";
import React from "react";
// import { Button } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Componenet/Firebase/firebase";
import { BsEmojiWinkFill } from "react-icons/bs";
import Card from "./Card";
import { Doughnut, Line } from "react-chartjs-2";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import {
  Chart,
  ArcElement,
  CategoryScale,
  PointElement,
  LineController,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "../../Loading";

const DashPord = () => {
  const [value, loadingg, errorr] = useCollection(collection(db, `Users`));
  const lastUser = value && value.docs[value.docs.length - 1].data();
  const [values, loading, error] = useCollection(collection(db, `Products`));
  const lastProducts = values && values.docs[values.docs.length - 1].data();
  const navigate = useNavigate();
  Chart.register(
    ArcElement,
    CategoryScale,
    LineController,
    PointElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className="d-flex">
      <div style={{ width: "20%" }} className=" bg-yellowColor vh-100 ">
        <div className="m-4">
          <div className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom">
            <BsEmojiWinkFill className="fs-1 text-white  " />
            <h4 className="mt-1 text-white">Dashboard</h4>
          </div>
          <div
            onClick={() => navigate("/admin/product")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
            <MdProductionQuantityLimits className="fs-3 mt-2 text-white" />

            <h4 className="mt-1 text-white">Products</h4>
          </div>
          <div
            onClick={() => navigate("/admin/users")}
            className="d-flex pointer justify-content-center pb-3 w-5 mt-4 gap-3 border-bottom"
          >
            <FaUsers className="fs-3 mt-2 text-white" />

            <h4 className="mt-1 text-white">Users</h4>
          </div>
        </div>
      </div>
      <div className="w-100 container">
        <div className="d-sm-flex align-items-center mt-2 justify-content-between mb-4">
          <h1 className=" mb-0 text-secondary">Dashboard</h1>
        </div>
        <div className="row  w-100 gap-5 ">
          <Card title="Earnings(Monthly)" value="$40,000" color="primary" />
          <Card title="Earnings(Annual)" value="$215,000" color="success" />
          <Card title="Tasks" value="50%" color="info" />
          <Card title="Pending Requests" value="18" color="warning" />
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-5">
            <Doughnut
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Revenue Sources",
                  },
                },
                responsive: true,
              }}
              data={{
                labels: ["Direct", "Referral", "Social"],
                datasets: [
                  {
                    data: [55, 30, 15],
                    backgroundColor: [
                      "rgb(255, 99, 132)",
                      "rgb(54, 162, 235)",
                      "lightgreen",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
          <div className="col-xl-8 col-lg-7">
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Earnings Overview",
                  },
                },
              }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "Earnings in $",
                    data: [0, 10000, 5000, 15000, 13000, 22000, 33000],
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashPord;
/*
{/* <div
        style={{ width: "80%" }}
        className=" d-flex justify-content-around align-items-center"
      >
        <div
          style={{ background: "#3F65D4", width: "40%" }}
          className=" text-light rounded p-5  d-flex justify-content-center flex-column align-items-center"
        >
          <h1>Users</h1>
          <h3 className="mt-5">
            Number of Users : {value && value?.docs.length}
          </h3>
          <h3 className="mt-5 mb-5">
            Last Users Registered
            <span className=" text-warning d-inline-block  ">
              : {lastUser?.userFirstName}
            </span>
          </h3>
          <Button
            variant="outline-warning"
            className="text-black fw-bold"
            onClick={() => navegiate("/admin/users")}
          >
            Show Users{" "}
          </Button>
        </div>
        <div
          style={{ background: "#3F65D4", width: "40%" }}
          className=" text-light rounded p-5 d-flex justify-content-center flex-column align-items-center  "
        >
          <h1>Products</h1>
          <h3 className="mt-5">
            Number of Products : {values && values?.docs.length}
          </h3>
          <h3 className="mt-5  mb-5">
            Last Products Added is :
            <span className=" text-warning d-inline-block ">
              {lastProducts?.title}
            </span>
          </h3>

          <Button
            variant="outline-warning"
            className="text-black fw-bold"
            onClick={() => navegiate("/admin/product")}
          >
            Show products{" "}
          </Button>
        </div>
      </div> */
