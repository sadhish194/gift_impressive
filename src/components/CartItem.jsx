
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQty } = useCart();

  const decreaseQty = () => {
    updateQty(item.id, Math.max(1, item.qty - 1));
  };

  const increaseQty = () => {
    updateQty(item.id, item.qty + 1);
  };

  return (
    <div className="cart-item">
      {/* PRODUCT IMAGE */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">₹{item.price}</p>

        {/* ACTIONS */}
        <div className="cart-item-actions">
          {/* QTY CONTROLS */}
          <div className="qty-box">
            <button
              aria-label="Decrease quantity"
              onClick={decreaseQty}
            >
              −
            </button>

            <span className="qty-value">{item.qty}</span>

            <button
              aria-label="Increase quantity"
              onClick={increaseQty}
            >
              +
            </button>
          </div>

          {/* REMOVE ITEM */}
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
