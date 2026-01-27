import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  const handlePayment = (method) => {
    alert(`Payment Successful via ${method}`);
    navigate("/order-success"); // redirect after payment
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">Payment</h1>

      <div className="payment-container">
        {/* LEFT : PAYMENT METHODS */}
        <div className="payment-methods">
          <h2>Select Payment Method</h2>

          <button onClick={() => handlePayment("UPI")} className="payment-btn">
            Pay via UPI (GPay / PhonePe / Paytm)
          </button>

          <button onClick={() => handlePayment("Card")} className="payment-btn">
            Debit / Credit Card
          </button>

          <button onClick={() => handlePayment("NetBanking")} className="payment-btn">
            Net Banking
          </button>

          <button onClick={() => handlePayment("COD")} className="payment-btn cod">
            Cash on Delivery
          </button>
        </div>

        {/* RIGHT : PRICE SUMMARY */}
        <div className="payment-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>

          <p className="secure-note">
            🔒 Secure & Encrypted Payments
          </p>
        </div>
      </div>
    </div>
  );
}
