import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";

const ProductCard = ({ item }) => {
  const { deleteProduct } = useProduct();
  const navigate = useNavigate();
  return (
    <div>
      Title:{item.title}
      Price:${item.price}
      Category: {item.category.title}
      Description : {item.description}
      <img width={100} src={item.image} alt="" />
      {item.is_author ? (
        <>
          <button onClick={() => deleteProduct(item.id)}>delete</button>
          <button onClick={() => navigate(`/edit/${item.id}`)}>edit</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductCard;
