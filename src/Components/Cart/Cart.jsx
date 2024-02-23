import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const { setCounter, getCart, deleteItem, updateQuantity } =
    useContext(cartContext);
  const [data, setData] = useState(null);

  async function deleteProduct(id) {
    let data = await deleteItem(id);
    if (data.status === "success") {
      toast.success("Item's Deleted Successfully");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }
  async function updateQuantityInsideCart(id, count) {
    let data = await updateQuantity(id, count);
    console.log(data);
    if (data.status === "success") {
      toast.success("Quantity's Updated Successfully");
      setData(data);
      setCounter(data.numOfCartItems);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        let cartData = await getCart();
        if (cartData?.status === "fail") {
          setData(null);
        } else {
          setData(cartData);
          setCounter(cartData.numOfCartItems);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setData(null);
      }
    })();
  }, []);

  if (data === null) {
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
  if (data.numOfCartItems === 0)
    return <h2 className="text-center text-main my-5">No Items To Show</h2>;
  return (
    <>
      <div className="container my-3 p-3 bg-main-light">
        <h2 className="fw-semibold">Your Cart :</h2>
        <p className="text-main">
          Total Cart Price : {data?.data?.totalCartPrice} $
        </p>
        {data?.data?.products.map((product) => {
          return (
            <div
              className="row py-2 border-bottom align-items-center"
              key={product._id}>
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt={product.product.title}
                />
              </div>
              <div className="col-md-11 ">
                <div className="row justify-content-between align-items-center">
                  <div className="col-md-9">
                    <h4>{product.product.title}</h4>
                    <p className="text-main m-1">Price : {product.price} $</p>
                    <button
                      className="btn p-0"
                      onClick={() => {
                        deleteProduct(product.product._id);
                      }}>
                      <span>
                        <i className="fa-solid fa-trash text-main"></i>
                      </span>{" "}
                      Remove
                    </button>
                  </div>
                  <div className="col-md-3 ms-auto text-center">
                    <button
                      onClick={() => {
                        updateQuantityInsideCart(
                          product.product._id,
                          product.count + 1
                        );
                      }}
                      className="btn fw-bold fs-4 myBorder">
                      +
                    </button>
                    <span className="fw-semibold mx-3">{product.count}</span>
                    <button
                      disabled={product.count <= 1}
                      onClick={() => {
                        updateQuantityInsideCart(
                          product.product._id,
                          product.count - 1
                        );
                      }}
                      className="btn fw-bold fs-4 myBorder">
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="d-flex justify-content-end">
          <Link to={`/address/${data.data._id}`}>
            {console.log(data.data._id)}
            <button className="btn bg-main text-white  mt-3">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
