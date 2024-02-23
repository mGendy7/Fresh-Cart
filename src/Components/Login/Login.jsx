import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "./../../Context/AuthContext";

function Login() {
  const userData = {
    email: "",
    password: "",
  };
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const { setToken, getUserInfo } = useContext(authContext);

  async function onSubmit(values) {
    setIsLoading(true);
    await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .then((x) => {
        if (x.data.message === "success") {
          localStorage.setItem("token", x.data.token);
          setToken(x.data.token);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/products");
            getUserInfo();
          }, 2500);
        }
      })
      .catch((x) => {
        setErrMsg(x.response.data.message);
        setTimeout(() => {
          setErrMsg(undefined);
        }, 4000);
        console.log(x);
      });
    setIsLoading(false);
  }

  const mySchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: userData,
    onSubmit: onSubmit,
    validationSchema: mySchema,
  });

  return (
    <>
      <div className="container p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">Welcome</div>
        ) : (
          ""
        )}
        {errMsg ? (
          <div className="alert alert-danger text-center">
            {errMsg !== "fail"
              ? errMsg
              : "Error occurred, please make sure information provided is valid"}
          </div>
        ) : (
          ""
        )}
        <h2 className="text-main mb-4">Login :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            type="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            type="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between">
            <Link to="/forget">Forgot Password?</Link>
            <button
              disabled={!(formik.dirty && formik.isValid)}
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
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
