import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./AuthContextProvider";

export const productContext = createContext();
export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  pages: 1,
  categories: [],
  oneProduct: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 6),
      };

    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };

    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  function getConfig() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    //config
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  }

  async function getCategories() {
    try {
      const res = await axios(`${API}/category/list/`, getConfig());
      dispatch({ type: "GET_CATEGORIES", payload: res.data.results });
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(newProduct) {
    try {
      const res = await axios.post(`${API}/products/`, newProduct, getConfig());
      console.log(res);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      const res = await axios(
        `${API}/products/${window.location.search}`,
        getConfig()
      );
      dispatch({ type: "GET_PRODUCTS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/products/${id}/`, getConfig());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneProduct(id) {
    const res = await axios(`${API}/products/${id}/`, getConfig());

    dispatch({ type: "GET_ONE_PRODUCT", payload: res.data });
  }

  async function updateProduct(id, editedProduct) {
    try {
      await axios.patch(`${API}/products/${id}/`, editedProduct, getConfig());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    getCategories,
    categories: state.categories,
    createProduct,

    getProducts,
    products: state.products,
    pages: state.pages,
    deleteProduct,

    getOneProduct,
    oneProduct: state.oneProduct,
    updateProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
