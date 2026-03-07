import React from "react";
import { useCart } from "../context/cartContext";
import "../styles/cart.css";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">Ksh {item.price}</span>
                </div>

                <div className="item-quantity">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>

                <div className="item-subtotal">
                  Subtotal: Ksh {item.price * item.quantity}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Total: Ksh {total}</strong>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;