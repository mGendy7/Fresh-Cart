import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../Context/WishListContext";

function ProductDetails() {
  const { id } = useParams();
  const myId = id;
  function getProductDetails() {
    return axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
  }

  const { data, isLoading, isError } = useQuery(
    `getProductDetails-${id}`,
    getProductDetails
  );
  const product = data?.data.data;
  const { setCounter, addToCart } = useContext(cartContext);
  const [addLoading, setAddLoading] = useState(false);
  async function productsAddToCart(productId) {
    try {
      setAddLoading(true);
      let data = await addToCart(productId);
      if (data.status === "success") {
        toast.success("Product Added Successfully");
        setCounter(data.numOfCartItems);
      }
      setAddLoading(false);
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
  const [color, setColor] = useState("text-main");
  async function addToWishList(productId) {
    try {
      // console.log(data);
      let data = await getWishList();
      console.log(data);
      if (data.data.data.some((item) => item._id === productId)) {
        let remove = await removeProductFromWishList(productId);
        if (remove.status === 200) {
          console.log(remove);
          setColor("text-main");
          toast.success("Product Removed from Wishlist");
          const updatedWishList = savedWishList.filter(
            (id) => id !== productId
          );
          setSavedWishList(updatedWishList);
          localStorage.setItem(
            "savedWishList",
            JSON.stringify(updatedWishList)
          );
          setWishListCounter(data.data.data.length);
        }
      } else {
        let add = await addProductToWishList(productId);

        if (add.status === 200) {
          // console.log(add);

          setColor("text-danger");
          savedWishList.push(productId);
          localStorage.setItem("savedWishList", JSON.stringify(savedWishList));
          toast.success("Product Added To Wishlist");
          setWishListCounter(data.data.data.length);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  }
  useEffect(() => {
    const storedWishList = JSON.parse(localStorage.getItem("savedWishList"));

    if (storedWishList) {
      setSavedWishList(storedWishList);
      const isIn = storedWishList.some((id) => id === myId);
      setColor(isIn ? "text-danger" : "text-main");
    }
  }, []);

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
  if (isError) {
    return <Navigate to="/notfound" />;
  }
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <figure className="py-5">
              {" "}
              {
                <img
                  src={product.imageCover}
                  className="w-100"
                  alt={product.name}
                />
              }
            </figure>
          </div>
          <div className="col-md-8">
            <article>
              <h1>{product.title}</h1>
              <p className="text-muted my-4">{product.description}</p>
              <h6 className="fw-semibold">{product.category.name}</h6>
              <div className="d-flex justify-content-between mt-4">
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
              </div>{" "}
              <div className="row align-items-center">
                <div className="col-md-10">
                  <button
                    onClick={() => productsAddToCart(product.id)}
                    className="btn w-100 btn-success text-center d-flex justify-content-center">
                    {addLoading ? (
                      <Circles
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
                <div className="col-md-2 text-center">
                  <span
                    role="button"
                    onClick={() => addToWishList(product.id)}
                    className={`fs-3 ${color}`}>
                    <i className="fa-solid fa-heart"></i>{" "}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
