import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";

const EditProduct = () => {
  const {
    getCategories,
    categories,
    createProduct,
    oneProduct,
    getOneProduct,
    updateProduct,
  } = useProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category.id);
    }
  }, [oneProduct]);

  function handleSave() {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("category", category);

    if (image) {
      newProduct.append("image", image);
    }
    updateProduct(id, newProduct);
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
        value={title}
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
        value={description}
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="text"
        value={price}
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
      <button onClick={handleSave}>save changes</button>
    </div>
  );
};

export default EditProduct;
