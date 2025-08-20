import "./UserPage.css";
import React, { useState, useEffect } from "react";

function UserPage({ user, handleLogout }) {
  const [name, setItemName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image); // image is a File object
    try {
      const response = await fetch("http://localhost:3001/api/shop/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ saved item successfuly!");
      } else {
        alert("❌ saved item failed: " + data.message);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  return (
    <div className="userpage-container">
      <div className="userpage-card">
        <h1>Welcome, {user.name} 👋</h1>
        {user.email === "admin@gmail.com" && (
          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name of item"
              value={name}
              onChange={(e) => setItemName(e.target.value)}
              required
            ></input>
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              required
            ></input>
            <input
              type="text"
              placeholder="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              required
            ></input>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} // store the first selected file
              required
            ></input>
            <button type="submit">submit</button>
          </form>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserPage;
