import React from "react";
import image from "../../images/error.svg";
function NotFound() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center h-100 py-5">
        <img src={image} alt="" />
      </div>
    </>
  );
}

export default NotFound;
