import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pageNotFound from "./Artwork.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container liner">
      <img
        src={pageNotFound}
        alt="Page Not Found"
        className="not-found-image"
      />
      <div className="overlay-content">
        <h1 className="not-found-title">Page Not Found</h1>
        <button
          className="bg-button text-white px-3 py-1 rounded-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
