import React from "react";
import { useCart } from "../context/cartContext";
import "../styles/cart.css";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.images?.[0]?.image_url || "https://via.placeholder.com/80"}
                alt={item.name}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Ksh {item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total: Ksh {total}</p>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}