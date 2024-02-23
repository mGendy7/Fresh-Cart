import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";

export default function CategoriesSlider() {
  function getCategoriesSlider() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery(
    "getCategoriesSlider",
    getCategoriesSlider
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
    slidesToScroll: 3,
  };
  return (
    <>
      {isLoading ? (
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
      ) : (
        <Slider {...settings}>
          {data?.data.data.map((cat, i) => (
            <div key={i}>
              <img
                src={cat.image}
                alt={cat.name}
                className="w-100"
                style={{ height: 200 }}
              />{" "}
              <h5 className="text-center my-2">{cat.name}</h5>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
