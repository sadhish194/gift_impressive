import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // ⬅️ IMPORTANT: cart starts as null (not [])
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  // 🔑 Decide storage key
  const getStorageKey = () => {
    return isAuthenticated && user
      ? `user_cart_${user}`
      : "guest_cart";
  };

  // 📦 Load cart BEFORE first render
  useEffect(() => {
    const key = getStorageKey();
    const storedCart = JSON.parse(localStorage.getItem(key)) || [];

    setCart(storedCart);
    setLoading(false); // ⬅️ cart is now ready
  }, [isAuthenticated, user]);

  // 💾 Save cart ONLY after it is loaded
  useEffect(() => {
    if (cart === null) return;

    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, isAuthenticated, user]);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ Remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update quantity
  const updateQty = (id, qty) => {
    if (qty <= 0) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // 🧮 Total price (safe when cart is null)
  const totalPrice = cart
    ? cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      )
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,
        loading,          // ⬅️ EXPOSE loading
        searchQuery,
        setSearchQuery,
      }}
    >
      {/* ⛔ BLOCK CHILDREN UNTIL CART IS READY */}
      {!loading && children}
    </CartContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useCart = () => useContext(CartContext);
