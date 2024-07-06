import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NotFouned = () => {
  const navegit = useNavigate();
  return (
    <div className="bg-secondary d-flex justify-content-center vh-100 align-items-center flex-column  ">
      <div className="w-75 bg-primary rounded-2 p-5">
        <h1 className="text-center ">
          Eror 404 Page Not Founed
        </h1>
      </div>
      <div className="mt-3">
        <Button variant="danger" onClick={() => navegit(-1)}>
          Back To Last bage
        </Button>
      </div>
    </div>
  );
};

export default NotFouned;
