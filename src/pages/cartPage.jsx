import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { cartAPI, orderAPI } from "../services/api";
import "../styles/cart.css";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = subtotal * 0.16; // 16% tax (adjust as needed)
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  // Apply discount code
  const handleApplyDiscount = () => {
    if (discountCode === "WELCOME10") {
      setDiscount(10);
      setError(null);
    } else if (discountCode === "SAVE20") {
      setDiscount(20);
      setError(null);
    } else {
      setError("Invalid discount code");
      setDiscount(0);
    }
  };

  // Handle quantity changes
  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // Sync cart with Django backend (optional)
  const syncCartWithBackend = async () => {
    try {
      for (const item of cart) {
        await cartAPI.addToCart(item.id, item.quantity);
      }
    } catch (err) {
      console.error("Error syncing cart with backend:", err);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare order data
      const orderData = {
        customer_name: "Guest User", // TODO: Get from user session
        customer_email: "guest@example.com", // TODO: Get from user session
        total_price: total,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      // Create order in Django backend
      const response = await orderAPI.create(orderData);

      if (response.status === 201) {
        // Clear cart after successful order
        clearCart();

        // Navigate to confirmation page with order ID
        navigate(`/order-confirmation/${response.data.id}`, {
          state: { order: response.data },
        });
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to process checkout. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-hint">
            Start shopping and add some amazing products!
          </p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      <div className="cart-wrapper">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="cart-header">
            <span className="col-product">Product</span>
            <span className="col-price">Price</span>
            <span className="col-quantity">Quantity</span>
            <span className="col-subtotal">Subtotal</span>
            <span className="col-action">Action</span>
          </div>

          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                {/* Product Info */}
                <div className="item-product">
                  <Link to={`/products/${item.id}`} className="product-link">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="item-image" />
                    )}
                    <div className="product-details">
                      <span className="item-name">{item.name}</span>
                      {item.description && (
                        <p className="item-description">
                          {item.description.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Price */}
                <div className="item-price">
                  Ksh {item.price?.toLocaleString() || 0}
                </div>

                {/* Quantity Controls */}
                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="item-subtotal">
                  Ksh {(item.price * item.quantity)?.toLocaleString() || 0}
                </div>

                {/* Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="continue-shopping">
            <Link to="/products">← Continue Shopping</Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-section">
          <div className="order-summary">
            <h3>Order Summary</h3>

            {/* Subtotal */}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Ksh {subtotal?.toLocaleString() || 0}</span>
            </div>

            {/* Tax */}
            <div className="summary-row">
              <span>Tax (16%)</span>
              <span>Ksh {taxAmount?.toLocaleString() || 0}</span>
            </div>

            {/* Discount */}
            {discountAmount > 0 && (
              <div className="summary-row discount-row">
                <span>Discount ({discount}%)</span>
                <span>-Ksh {discountAmount?.toLocaleString() || 0}</span>
              </div>
            )}

            {/* Shipping (Optional) */}
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            {/* Total */}
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-amount">
                Ksh {total?.toLocaleString() || 0}
              </span>
            </div>

            {/* Discount Code */}
            <div className="discount-section">
              <label>Apply Discount Code</label>
              <div className="discount-input-group">
                <input
                  type="text"
                  placeholder="Enter code (e.g., WELCOME10)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="discount-input"
                />
                <button
                  className="apply-discount-btn"
                  onClick={handleApplyDiscount}
                >
                  Apply
                </button>
              </div>
              <small className="discount-hint">
                Try: WELCOME10 (10% off) or SAVE20 (20% off)
              </small>
            </div>

            {/* Checkout Button */}
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>

            {/* Security Badge */}
            <div className="security-badge">
              🔒 Secure checkout with SSL encryption
            </div>
          </div>

          {/* Order Notes */}
          <div className="order-notes">
            <h4>Delivery Information</h4>
            <ul>
              <li>✓ Free shipping on all orders</li>
              <li>✓ Delivery in 2-3 business days</li>
              <li>✓ Track your order in real-time</li>
              <li>✓ 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;