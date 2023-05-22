import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
    </Routes>
  );
};

export default MainRoutes;
