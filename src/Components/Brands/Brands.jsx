import axios from "axios";
import React from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Brands() {
  function getAllBrands() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery("getAllBrands", getAllBrands);
  const allBrands = data?.data.data;
  console.log(allBrands);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row py-5 gy-3">
          {allBrands.map((cat, i) => (
            <div className="col-md-4" key={cat._id}>
              <Link to={`/specific-brand/${cat._id}`}>
                {console.log(cat._id)}
                <div className="border">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-100"
                    style={{ height: 350 }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Brands;
