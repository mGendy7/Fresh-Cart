import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src={require("../../images/grocery-banner-2.jpeg")}
          className="w-100"
          style={{ height: 350 }}
          alt=""
        />{" "}
      </div>
      <div>
        <img
          src={require("../../images/grocery-banner.png")}
          className="w-100"
          style={{ height: 350 }}
          alt=""
        />{" "}
      </div>
      <div>
        <img
          src={require("../../images/slider-2.jpeg")}
          className="w-100"
          alt=""
          style={{ height: 350 }}
        />{" "}
      </div>
      <div>
        <img
          src={require("../../images/banner-4.jpeg")}
          className="w-100"
          alt=""
          style={{ height: 350 }}
        />{" "}
      </div>
    </Slider>
  );
}
