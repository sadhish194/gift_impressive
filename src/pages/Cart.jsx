import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 🛒 EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add products to see them here</p>

        <button
          className="shop-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* LEFT SIDE – CART ITEMS */}
      <div className="cart-left">
        <h2 className="cart-title">
          Shopping Cart ({cart.length})
        </h2>

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p className="price">₹{item.price}</p>

              {/* QTY CONTROLS */}
              <div className="qty-row">
                <span>Qty</span>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(
                      item.id,
                      Math.max(1, Number(e.target.value))
                    )
                  }
                />
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE – PRICE SUMMARY */}
      <div className="cart-summary">
        <h3>Price Details</h3>

        <div className="summary-row">
          <span>Total Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="summary-row">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>

        {!isAuthenticated && (
          <p className="login-note">
            Please login to complete your purchase
          </p>
        )}

        <button
          className="checkout-btn"
          onClick={() =>
            isAuthenticated
              ? navigate("/checkout")
              : navigate("/login", {
                  state: { from: "/checkout" },
                })
          }
        >
          {isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CONTINUE"}
        </button>

      </div>
    </div>
  );
}