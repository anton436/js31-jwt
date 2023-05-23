import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";

const AddProduct = () => {
  const { getCategories, categories, createProduct } = useProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  console.log(category);

  useEffect(() => {
    getCategories();
  }, []);

  function handleSave() {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("category", category);
    newProduct.append("image", image);
    createProduct(newProduct);
  }

  return (
    <div>
      <h2>Add Product</h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="text"
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option> Choose category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        accept="image/*"
      />
      <br />
      <button onClick={handleSave}>Create Product</button>
    </div>
  );
};

export default AddProduct;
