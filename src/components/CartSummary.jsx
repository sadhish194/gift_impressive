import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">Order Summary</h2>

      <div className="cart-summary-row">
        <span>Subtotal</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="cart-summary-row">
        <span>Delivery</span>
        <span className="free">FREE</span>
      </div>

      <div className="cart-summary-divider"></div>

      <div className="cart-summary-total">
        <span>Total Amount</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        className="checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>

      <p className="secure-text">
        🔒 Secure checkout • Easy returns
      </p>
    </div>
  );
}
