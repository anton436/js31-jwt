import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);
const API = "http://34.173.115.25/api/v1";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(formData) {
    try {
      setLoading(true);
      await axios.post(`${API}/account/register/`, formData);
      navigate("/register-success");
    } catch (error) {
      setError(Object.values(error.response.data));
    } finally {
      setLoading(false);
    }
  }

  const values = { handleRegister, loading, error, setError, currentUser };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
