import React from "react";

function Footer() {
  return (
    <>
      <footer className="py-5 bg-main-light ">
        <div className="container">
          <h4 className="fw-semibold">Get The Fresh Cart App</h4>
          <p className="text-main">
            We'll send you a link, open on your phone to download app
          </p>
          <div className="row border-bottom pb-4">
            <div className="col-md-10">
              <input
                type="email"
                placeholder="Type Your Email"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100">Share App Link</button>
            </div>
          </div>
          <div className="footer-foot pt-3 d-flex justify-content-between align-items-center">
            <div className="foot1 d-flex align-items-center">
              Payment Partners:{" "}
              <i className="fa-brands fa-amazon-pay fa-2x ms-3 me-2 text-main"></i>{" "}
              <i className="fa-brands fa-paypal fa-2x mx-2 text-main"></i>
              <i className="fa-brands fa-google-pay fa-2x mx-2 text-main"></i>
              <i className="fa-brands fa-cc-mastercard fa-2x mx-2 text-main"></i>
            </div>
            <div className="foot2 d-flex align-items-center">
              Get Deleveries With Fresh Cart
              <i className="fa-brands fa-app-store fa-2x ms-3 me-2 text-main"></i>{" "}
              <i className="fa-brands fa-google-play fa-2x mx-2 text-main"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
