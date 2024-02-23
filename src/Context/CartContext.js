import axios from "axios";
import React, { createContext, useState } from "react";

export const cartContext = createContext(0);
function CartContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  async function addToCart(productId) {
    return axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }
  async function getCart() {
    return axios
      .get("https://route-ecommerce.onrender.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => data)
      .catch((err) => err);
  }
  async function deleteItem(productId) {
    return axios
      .delete("https://route-ecommerce.onrender.com/api/v1/cart/" + productId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => data)
      .catch((err) => err);
  }
  async function pay(cartId, shippingAddress) {
    return axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/" +
          cartId,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }
  async function updateQuantity(productId, count) {
    return axios
      .put(
        "https://route-ecommerce.onrender.com/api/v1/cart/" + productId,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        deleteItem,
        updateQuantity,
        pay,
      }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
