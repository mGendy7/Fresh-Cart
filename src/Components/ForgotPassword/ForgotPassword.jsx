import React from "react";

function ForgotPassword() {
  return (
    <>
      <div className="container py-5">
        <input
          type="email"
          placeholder="Type Your Email "
          className="form-control"
        />
        <div className="d-flex justify-content-end">
          <button className="btn bg-main text-white mt-3">
            Send Reset Code
          </button>
        </div>{" "}
      </div>
    </>
  );
}

export default ForgotPassword;
