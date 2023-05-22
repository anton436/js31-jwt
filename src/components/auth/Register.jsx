import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import Loader from "../Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { handleRegister, loading, error, setError } = useAuth();

  function handleSave() {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("заполните поля");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirm", passwordConfirm);
      handleRegister(formData);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Register</h1>
      {error ? <h2>{error}</h2> : null}
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        type="text"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="text"
      />
      <input
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="password confirm"
        type="text"
      />
      <button onClick={handleSave}>register</button>
    </div>
  );
};

export default Register;
