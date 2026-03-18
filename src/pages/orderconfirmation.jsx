import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { orderAPI } from "../services/api";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        // Try to get order from location state first (faster)
        if (location.state?.order) {
          setOrder(location.state.order);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const response = await orderAPI.getById(orderId);
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, location]);

  if (loading) {
    return (
      <div className="confirmation-container loading">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="confirmation-container error">
        <h2>Oops!</h2>
        <p>{error || "Order not found"}</p>
        <Link to="/products" className="back-btn">
          Back to Shopping
        </Link>
      </div>
    );
  }

  // Calculate totals from items
  const subtotal = order.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0;
  const tax = subtotal * 0.16;
  const total = order.total_price || subtotal + tax;

  return (
    <div className="confirmation-container">
      {/* Success Header */}
      <div className="confirmation-header">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase</p>
      </div>

      {/* Order Details Card */}
      <div className="confirmation-card">
        {/* Order Number & Status */}
        <div className="order-header">
          <div className="order-number">
            <span className="label">Order Number</span>
            <span className="value">#{order.id}</span>
          </div>
          <div className="order-status">
            <span className="label">Status</span>
            <span className={`badge badge-${order.status}`}>
              {order.status?.toUpperCase()}
            </span>
          </div>
          <div className="order-date">
            <span className="label">Order Date</span>
            <span className="value">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="customer-section">
          <h3>Delivery Information</h3>
          <div className="customer-info">
            <p>
              <strong>Name:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Email:</strong> {order.customer_email}
            </p>
          </div>
        </div>

        {/* Order Items */}
        {order.items && order.items.length > 0 && (
          <div className="items-section">
            <h3>Order Items</h3>
            <div className="items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="item-row">
                  <div className="item-name">
                    {item.product?.name || "Product"}
                  </div>
                  <div className="item-qty">
                    Qty: {item.quantity}
                  </div>
                  <div className="item-price">
                    Ksh {item.price?.toLocaleString() || 0}
                  </div>
                  <div className="item-subtotal">
                    Ksh {(item.price * item.quantity)?.toLocaleString() || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="summary-section">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Ksh {subtotal?.toLocaleString() || 0}</span>
          </div>
          <div className="summary-row">
            <span>Tax (16%)</span>
            <span>Ksh {tax?.toLocaleString() || 0}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>Ksh {total?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="timeline-section">
          <h3>Order Timeline</h3>
          <div className="timeline">
            <div className={`timeline-item ${order.status === 'pending' ? 'active' : 'completed'}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Order Placed</h4>
                <p>{new Date(order.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className={`timeline-item ${order.status === 'processing' ? 'active' : order.status !== 'pending' ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Processing</h4>
                <p>We're preparing your order</p>
              </div>
            </div>

            <div className={`timeline-item ${order.status === 'shipped' ? 'active' : order.status === 'delivered' ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Shipped</h4>
                <p>Your order is on its way</p>
              </div>
            </div>

            <div className={`timeline-item ${order.status === 'delivered' ? 'active' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Delivered</h4>
                <p>Order will arrive in 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>✓ You'll receive an email confirmation shortly</li>
            <li>✓ Track your order status in your account</li>
            <li>✓ Estimated delivery: 2-3 business days</li>
            <li>✓ Questions? Contact our support team</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>

      {/* Customer Support */}
      <div className="support-section">
        <h4>Need Help?</h4>
        <p>
          Contact our customer support team at{" "}
          <a href="mailto:support@lorreenstore.com">support@lorreenstore.com</a>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;