import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "./../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

function Address() {
  const userAddress = {
    details: "",
    phone: "",
    city: "",
  };
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const { setToken } = useContext(authContext);
  const { pay } = useContext(cartContext);

  async function onSubmit(values) {
    setIsLoading(true);
    let data = await pay(id, values);
    console.log(data);
    setIsLoading(false);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: userAddress,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="container p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">Welcome Back</div>
        ) : (
          ""
        )}
        {errMsg ? (
          <div className="alert alert-danger text-center">{errMsg}</div>
        ) : (
          ""
        )}
        <h2>Shipping Address</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <textarea
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="details"
            type="text"
            className="form-control mb-3"></textarea>

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="phone"
            type="tel"
            className="form-control mb-3"
          />

          <label htmlFor="city">City:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="city"
            type="text"
            className="form-control mb-3"
          />

          <div className="d-flex justify-content-end">
            <button
              className="bg-main p-2 text-white btn rounded-3"
              type="submit">
              {isLoading ? (
                <BallTriangle
                  height={30}
                  width={30}
                  radius={5}
                  color="#fff"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Go To Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Address;
