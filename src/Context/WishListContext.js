import axios from "axios";
import React, { createContext, useState } from "react";
export const wishListContext = createContext();
function WishListContextProvider({ children }) {
  const [savedWishList, setSavedWishList] = useState([]);
  const [wishListCounter, setWishListCounter] = useState(0);

  async function getWishList() {
    return await axios
      .get("https://route-ecommerce.onrender.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }
  async function addProductToWishList(productId) {
    return await axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  async function removeProductFromWishList(productId) {
    return await axios
      .delete(
        `https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  return (
    <>
      <wishListContext.Provider
        value={{
          addProductToWishList,
          wishListCounter,
          setWishListCounter,
          removeProductFromWishList,
          getWishList,
          savedWishList,
          setSavedWishList,
        }}>
        {children}
      </wishListContext.Provider>
    </>
  );
}

export default WishListContextProvider;
