import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  async function onSubmit(values) {
    setIsLoading(true);
    await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .then((x) => {
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((x) => {
        setErrMsg(x.response.data.message);
        console.log(x.response.data.message);

        setTimeout(() => {
          setErrMsg(undefined);
        }, 3000);
      });
    setIsLoading(false);
  }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string()
        .min(3, "must have 3 or more characters")
        .max(10, "can't exceed 10 characters")
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(6, "password must exceed 6 characters")
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "repassword must match password")
        .required(),
      phone: Yup.string().required("phone is required and must be valid"),
    });
    return schema;
  }

  const formik = useFormik({
    initialValues: userData,
    onSubmit: onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="container p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">Account Created</div>
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
        <h2 className="text-main mb-4">Register Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
            type="text"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
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

          <label htmlFor="rePassword">Repassword:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            id="rePassword"
            type="password"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            id="phone"
            type="tel"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-end">
            <button
              disabled={!(formik.isValid && formik.dirty)}
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
