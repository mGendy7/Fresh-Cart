import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "./../HomeSlider/HomeSlider";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../Context/WishListContext";

function Products() {
  function getAllProducts() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("allProducts", getAllProducts);
  console.log(data);
  const { setCounter, addToCart } = useContext(cartContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  async function productsAddToCart(productId) {
    setBtnLoading(true);
    try {
      let data = await addToCart(productId);
      if (data.status === "success") {
        setBtnLoading(false);
        toast.success("Product Added Successfully");
        setCounter(data.numOfCartItems);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const {
    addProductToWishList,
    setWishListCounter,
    removeProductFromWishList,
    getWishList,
    savedWishList,
    setSavedWishList,
  } = useContext(wishListContext);

  async function addToWishList(productId) {
    setWishLoading(true);

    try {
      let data = await getWishList();
      if (data.data.data.some((item) => item._id === productId)) {
        let remove = await removeProductFromWishList(productId);
        if (remove.status === 200) {
          toast.success("Product Removed from Wishlist");
          const updatedWishList = savedWishList.filter(
            (id) => id !== productId
          );
          setSavedWishList(updatedWishList);
          localStorage.setItem(
            "savedWishList",
            JSON.stringify(updatedWishList)
          );
          setWishLoading(false);
          setWishListCounter(data.data.data.length);
        }
      } else {
        let add = await addProductToWishList(productId);
        if (add.status === 200) {
          savedWishList.push(productId);
          localStorage.setItem("savedWishList", JSON.stringify(savedWishList));
          toast.success("Product Added To Wishlist");
          setWishLoading(false);
          setWishListCounter(data.data.data.length);
          console.log(data.data.data.length);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setWishLoading(false);
    }
  }
  useEffect(() => {
    const storedWishList =
      JSON.parse(localStorage.getItem("savedWishList")) || [];
    setSavedWishList(storedWishList);
  }, [setSavedWishList]);
  return (
    <>
      {!isLoading ? (
        <div className="container py-5">
          <div className="row g-0 mb-4">
            <div className="col-lg-9 d-none d-lg-block">
              <SimpleSlider />
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <div>
                <img
                  src={require("../../images/slider-image-3.jpeg")}
                  className="w-100"
                  style={{ height: 175 }}
                  alt=""
                />
              </div>
              <div>
                <img
                  src={require("../../images/slider-image-2.jpeg")}
                  className="w-100"
                  style={{ height: 175 }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <CategoriesSlider />
          <div className="row gy-4 mt-4">
            {data?.data.data.map((product, i) => (
              <div key={product.id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="product p-2">
                  <Link to={`/product-details/${product.id}`}>
                    <img src={product.imageCover} alt="" className="w-100" />
                    <h3 className="h6 text-main mt-1">
                      {product.category?.name}
                    </h3>
                    <h2 className="h5 fw-semibold text-center my-3">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      {" "}
                      {product.priceAfterDiscount ? (
                        <p>
                          <span className="text-decoration-line-through">
                            {product.price}$
                          </span>{" "}
                          - {product.priceAfterDiscount}$
                        </p>
                      ) : (
                        <p>{product.price}$</p>
                      )}
                      <p>
                        <span>
                          <i className="fa-solid fa-star text-warning pe-1"></i>
                        </span>
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => productsAddToCart(product.id)}
                      className="btn btn-success">
                      {btnLoading ? (
                        <Circles
                          height="15"
                          width="15"
                          color="#fff"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass={{ textAlign: "center" }}
                          visible={true}
                        />
                      ) : (
                        <i className="fa-solid fa-plus"></i>
                      )}
                    </button>
                    <button
                      onClick={() => addToWishList(product.id)}
                      className={`btn btn-success ${
                        savedWishList.includes(product.id)
                          ? "text-danger"
                          : "text-white"
                      }`}>
                      {wishLoading ? (
                        <Circles
                          height="15"
                          width="15"
                          color="#fff"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass={{ textAlign: "center" }}
                          visible={true}
                        />
                      ) : (
                        <i className="fa-solid fa-heart"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Products;
