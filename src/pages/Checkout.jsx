import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* LEFT : ADDRESS + DETAILS */}
        <form className="checkout-form">
          <h2 className="section-title">Delivery Address</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea placeholder="House no, Street, Area"></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input type="text" placeholder="Pincode" />
            </div>
          </div>
        </form>

        {/* RIGHT : ORDER SUMMARY */}
        <div className="checkout-summary">
          <h2 className="section-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className="free">FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Payable</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* ✅ UPDATED BUTTON */}
          <button
            type="button"
            className="place-order-btn"
            onClick={() => navigate("/payment")}
          >
            Place Order
          </button>

          <p className="secure-note">
            🔒 100% Secure Payments • Easy Returns
          </p>
        </div>
      </div>
    </div>
  );
}
