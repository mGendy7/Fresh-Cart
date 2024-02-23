import axios from "axios";
import React from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Categories() {
  function getAllCategories() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
  }
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery(
    "allCategories",
    getAllCategories
  );
  if (
    isCategoriesLoading ||
    !categoriesData ||
    !categoriesData.data ||
    !categoriesData.data.data
  ) {
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
          {categoriesData.data.data.map((cat, i) => (
            <div className="col-md-4" key={cat._id}>
              <Link to={`/subcategory/${cat._id}`}>
                <div className="">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-100"
                    style={{ height: 350 }}
                  />
                  <h3 className="text-main text-center mt-3 fw-semibold">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
