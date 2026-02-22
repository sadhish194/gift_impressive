import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Payment() {
  const { cart, totalPrice, setCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (method) => {
    if (!isAuthenticated) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await axios.post("/orders", {
        user: user, // ✅ FIXED HERE
        orderItems: cart.map((item) => ({
          product: item._id || item.id,
          quantity: item.qty,
          price: item.price,
        })),
        totalAmount: totalPrice,
        paymentMethod: method,
        status: method === "COD" ? "Placed" : "Paid",
      });

      setCart([]);

      alert(`Payment Successful via ${method}`);

      navigate("/order-success");

    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Payment Failed");
    }
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">Payment</h1>

      <div className="payment-container">
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