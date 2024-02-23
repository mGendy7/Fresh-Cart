import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(authContext);
  let { counter, setCounter, getCart } = useContext(cartContext);
  const { wishListCounter, getWishList, setWishListCounter } =
    useContext(wishListContext);
  const [cartData, setCartData] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const cartData = await getCart();
          const wishlistData = await getWishList();

          setCartData(cartData);
          setWishlistData(wishlistData);
          setCounter(cartData.numOfCartItems);
          setWishListCounter(wishlistData.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  function logout() {
    setCounter(0);
    setWishListCounter(0);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh Cart Logo" />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fa-solid fa-bars"></i>{" "}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center ">
              <li className="nav-item">
                <ul className="list-unstyled d-flex">
                  <li>
                    <i className="fa-brands fa-instagram mx-2"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-tiktok mx-2"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-facebook mx-2"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin mx-2"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter mx-2"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-youtube mx-2"></i>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                {token ? (
                  <ul className="list-unstyled d-flex carts">
                    <li className="mx-3">
                      <Link
                        to="/wishlist"
                        type="button"
                        className="btn btn-success position-relative">
                        <i className="fa-solid fa-heart"></i>{" "}
                        {wishListCounter ? (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {wishListCounter ? wishListCounter : ""}
                            <span className="visually-hidden">Wish List</span>
                          </span>
                        ) : (
                          ""
                        )}
                      </Link>{" "}
                    </li>
                    <li className="me-3">
                      <Link
                        to="/cart"
                        type="button"
                        className="btn btn-success position-relative">
                        <i className="fa-solid fa-cart-shopping"></i>{" "}
                        {counter ? (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {counter ? counter : ""}
                            <span className="visually-hidden">Cart</span>
                          </span>
                        ) : (
                          ""
                        )}
                      </Link>{" "}
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    {userData ? (
                      <span className="nav-link">
                        Hello,{" "}
                        <span className="text-main fw-semibold">
                          {userData.name.split(" ")[0].charAt(0).toUpperCase() +
                            userData.name.split(" ")[0].slice(1)}
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="nav-item">
                    <span onClick={logout} role="button" className="nav-link">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-main fw-semibold"
                      to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
