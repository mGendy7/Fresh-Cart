import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { wishListContext } from "../../Context/WishListContext";

function WishList() {
  const {
    addProductToWishList,
    setWishListCounter,
    removeProductFromWishList,
    getWishList,
    savedWishList,
    setSavedWishList,
  } = useContext(wishListContext);
  const { addToCart, setCounter } = useContext(cartContext);
  const [data, setData] = useState(null);

  async function toCart(productId) {
    let add = await addToCart(productId);
    console.log(add);
    toast.success("Item's Added Successfully");
    setCounter(add.numOfCartItems);
  }
  async function removeProduct(productId) {
    try {
      let remove = await removeProductFromWishList(productId);
      let updatedData = await getWishList();
      if (updatedData.status === 200) {
        toast.success("Item's Removed Successfully");

        setData(updatedData);
        const updatedWishList = savedWishList.filter((id) => id !== productId);
        setSavedWishList(updatedWishList);
        localStorage.setItem("savedWishList", JSON.stringify(updatedWishList));
        setWishListCounter(updatedData.data.count);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }
  useEffect(() => {
    (async () => {
      let data = await getWishList();
      setWishListCounter(data.data.count);
      setData(data);
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

  if (data.data.count === 0)
    return <h2 className="text-center text-main my-5">No Items To Show</h2>;
  return (
    <>
      <div className="container my-3 p-3 bg-main-light">
        <h2 className="fw-semibold">Your Wishlist :</h2>{" "}
        <p className="text-main">Number Of Items : {data.data.count}</p>
        {data.data.data.map((item) => {
          return (
            <div
              className="row py-2 border-bottom align-items-center"
              key={item.id}>
              <div className="col-md-1">
                <img src={item.imageCover} className="w-100" alt={item.title} />
              </div>
              <div className="col-md-11 ">
                <div className="row justify-content-between align-items-center">
                  <div className="col-md-9">
                    <h4>{item.title}</h4>
                    <p className="text-main m-1">Price : {item.price} $</p>
                    <button
                      className="btn p-0"
                      onClick={() => removeProduct(item.id)}>
                      <span>
                        <i className="fa-solid fa-trash text-main"></i>
                      </span>{" "}
                      Remove
                    </button>
                  </div>
                  <div className="col-md-3 ms-auto text-center">
                    <Link
                      to={`/product-details/${item.id}`}
                      className="btn btn-success">
                      Visit
                    </Link>
                    <button
                      onClick={() => toCart(item.id)}
                      className="btn btn-success mx-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  // <>
  //   <div className="container my-3 p-3 bg-main-light"
  //     <h2 className="fw-semibold">Your Wishlist :</h2>
  //     <p className="text-main">
  //       Total Cart Price : {data.data.totalCartPrice} $
  //     </p>
  //     {data.data.products.map((product) => {
  //       return (
  //         <div
  //           className="row py-2 border-bottom align-items-center"
  //           key={product._id}>
  //           <div className="col-md-1">
  //             <img
  //               src={product.product.imageCover}
  //               className="w-100"
  //               alt={product.product.title}
  //             />
  //           </div>

  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //     <div className="d-flex justify-content-end">
  //       <Link to={`/address/${data.data._id}`}>
  //         {console.log(data.data._id)}
  //         <button className="btn bg-main text-white  mt-3">
  //           Place Order
  //         </button>
  //       </Link>
  //     </div>
  //   </div>
  // </>
}

export default WishList;
