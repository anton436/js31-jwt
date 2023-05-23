import React from "react";

const ProductCard = ({ item }) => {
  console.log(item);
  return (
    <div>
      Title:{item.title}
      Price:${item.price}
      Category: ${item.category.title}
      Description : {item.description}
      <img width={100} src={item.image} alt="" />
      <button>delete</button>
      <button>edit</button>
    </div>
  );
};

export default ProductCard;
