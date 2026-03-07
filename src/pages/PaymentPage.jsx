import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import "../styles/PaymentPage.css";

export default function PaymentPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [activeTab, setActiveTab] = useState("mpesa");
  const [otherMethod, setOtherMethod] = useState("");

  // Mock payment handlers
  const handlePayment = (method) => {
    alert(`Processing ${method} payment of Ksh ${total}`);
  };

  return (
    <div className="payment-container">
      <h2>Checkout</h2>
      <div className="payment-tabs">
        <button
          className={activeTab === "mpesa" ? "active" : ""}
          onClick={() => setActiveTab("mpesa")}
        >
          M-Pesa
        </button>
        <button
          className={activeTab === "paypal" ? "active" : ""}
          onClick={() => setActiveTab("paypal")}
        >
          PayPal
        </button>
        <button
          className={activeTab === "stripe" ? "active" : ""}
          onClick={() => setActiveTab("stripe")}
        >
          Card (Stripe)
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "mpesa" && (
          <div className="tab-pane">
            <p>Pay using your M-Pesa mobile number.</p>
            <input type="tel" placeholder="Enter phone number" />
            <button onClick={() => handlePayment("M-Pesa")}>
              Pay Ksh {total} via M-Pesa
            </button>
          </div>
        )}
        {activeTab === "paypal" && (
          <div className="tab-pane">
            <p>Pay securely using PayPal.</p>
            <button onClick={() => handlePayment("PayPal")}>
              Pay Ksh {total} via PayPal
            </button>
          </div>
        )}
        {activeTab === "stripe" && (
          <div className="tab-pane">
            <p>Enter card details for Stripe payment.</p>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVC" />
            <button onClick={() => handlePayment("Stripe")}>
              Pay Ksh {total} via Card
            </button>
          </div>
        )}
      </div>

      <div className="other-methods">
        <label htmlFor="other-pay">Other Payment Methods:</label>
        <select
          id="other-pay"
          value={otherMethod}
          onChange={(e) => setOtherMethod(e.target.value)}
        >
          <option value="">Select method</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Google Pay">Google Pay</option>
          <option value="Apple Pay">Apple Pay</option>
        </select>
        {otherMethod && (
          <button onClick={() => handlePayment(otherMethod)}>
            Pay Ksh {total} via {otherMethod}
          </button>
        )}
      </div>

      <div className="cart-total">Total: Ksh {total}</div>
    </div>
  );
}