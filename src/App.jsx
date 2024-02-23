import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import { AuthContextProvider } from "./Context/AuthContext";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address/Address";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import SubCategory from "./Components/SubCategory/SubCategory";
import Brands from "./Components/Brands/Brands";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { Offline } from "react-detect-offline";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forget", element: <ForgotPassword /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "address/:id",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      { path: "categories", element: <Categories /> },
      { path: "subcategory/:id", element: <SubCategory /> },
      { path: "products", element: <Products /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "brands", element: <Brands /> },
      { path: "specific-brand/:id", element: <SpecificBrand /> },
      { path: "notfound", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  const client = new QueryClient();
  return (
    <>
      <ToastContainer
        theme={"light"}
        autoClose={2000}
        position={"bottom-right"}
      />
      <QueryClientProvider client={client}>
        <WishListContextProvider>
          <CartContextProvider>
            <AuthContextProvider>
              <RouterProvider router={routes} />
            </AuthContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </QueryClientProvider>
      <Offline>
        <span className="offline  rounded-end-3">
          No Internet Connection{" "}
          <i className="fa-solid fa-circle text-danger ms-2"></i>
        </span>
      </Offline>
    </>
  );
}

export default App;
