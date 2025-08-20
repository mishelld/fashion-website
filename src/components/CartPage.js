import "./CartPage.css";
import React, { useState, useEffect } from "react";

function CartPage() {
  const [items, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/shop/cart/${user.id}`);
      const data = await res.json();
      console.log("Cart data from backend:", data);
      setCartItems(data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (itemId) => {
    try {
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
        fetchCart();
        console.log("✅ Item added to cart:", data);
      } else {
        console.error("❌ Failed to add:", data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };
  const decreaseItem = async (itemId) => {
    try {
      // Get the user from localStorage
      const res = await fetch("http://localhost:3001/api/shop/cart/remove", {
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
        fetchCart();
        console.log("✅ Item removed from cart:", data);
      } else {
        console.error("❌ Failed to add:", data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <>
      <main className="cart-container">
        <section className="cart-items">
          <h1>Your Cart</h1>

          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <article className="cart-item" key={item.item._id}>
                <figure className="cart-img-container">
                  <img
                    src={`http://localhost:3001${item.item.imageUrl}`}
                    alt={item.item.name}
                  />
                </figure>

                <div className="cart-details">
                  <h2>{item.item.name}</h2>
                  <p className="price">Price: ${item.item.price}</p>
                </div>

                <div className="cart-controls">
                  <button
                    className="cart-btn decrement"
                    onClick={() => decreaseItem(item.item._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cart-btn increment"
                    onClick={() => addItem(item.item._id)}
                  >
                    +
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        {items.length > 0 && (
          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total items: {items.reduce((sum, i) => sum + i.quantity, 0)}</p>
            <p>
              Total price: $
              {items
                .reduce((sum, i) => sum + i.item.price * i.quantity, 0)
                .toFixed(2)}
            </p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </aside>
        )}
      </main>
    </>
  );
}

export default CartPage;
