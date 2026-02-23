import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handlePlaceOrder = async () => {
    try {
      if (!fullName || !email || !address || !city || !pincode) {
        alert("Please fill all delivery details");
        return;
      }

      await axios.post("/orders", {
        user: {
    id: user?.id || "Guest",
    email: user?.email || email,
  },

        shippingAddress: {
          fullName,
          email,
          address,
          city,
          pincode,
        },

        orderItems: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
          price: item.price,
        })),

        totalAmount: totalPrice,
        paymentMethod: "COD",
        status: "Placed",
      });

      alert("Order placed successfully 🎉");

      clearCart();
      navigate("/");

    } catch (error) {
      console.error("ORDER ERROR:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* LEFT : ADDRESS FORM */}
        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="section-title">Delivery Address</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              placeholder="House no, Street, Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
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
            onClick={handlePlaceOrder}
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