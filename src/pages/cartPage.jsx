import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "../styles/cart.css";;

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <span>{item.name}</span>
              <span>Ksh {item.price}</span>
            </div>
          ))
        )}
      </div>
      <div className="cart-total">Total: Ksh {total}</div>
    </div>
  );
};

export default CartPage;
