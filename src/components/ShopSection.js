import "./ShopSection.css";
import React, { useState, useEffect } from "react";

function ShopSection() {
  // 1. Categories
  const categories = ["All", "T-Shirts", "Hoodies", "Accessories"];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/shop"); // Adjust your API route
        const data = await res.json();
        setProducts(data.items || []); // Make sure backend returns { items: [...] }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (itemId) => {
    try {
      // Get the user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return alert("Please log in first");

      const res = await fetch("http://localhost:3001/api/shop/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // or user.id depending on your structure
          itemId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Item added to cart:", data);
      } else {
        console.error("❌ Failed to add:", data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // 3. State for selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 4. Filter products based on selection
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div id="shop" className="shop-container">
      <h1 className="shop-title">New Collection</h1>

      {/* Category Selector */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="items">
        {filteredProducts.map((item) => (
          <div className="item" key={item._id}>
            <div className="img-container">
              <img
                src={`http://localhost:3001${item.imageUrl}`}
                alt={item.name}
              />
            </div>
            <h1>{item.name}</h1>
            <p>{item.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(item._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopSection;
