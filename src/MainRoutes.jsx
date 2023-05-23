import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import ProductDetails from "./components/products/ProductDetails";
import ProductList from "./components/products/ProductList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME PAGE</h1>} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
    </Routes>
  );
};

export default MainRoutes;
