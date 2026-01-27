import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // 👈 REQUIRED

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔑 Decide storage key
  const getStorageKey = () => {
    return isAuthenticated && user
      ? `user_cart_${user}`
      : "guest_cart";
  };

  // 📦 Load cart when auth state changes
  useEffect(() => {
    const key = getStorageKey();
    const storedCart = JSON.parse(localStorage.getItem(key)) || [];
    setCart(storedCart);
  }, [isAuthenticated, user]);

  // 💾 Save cart whenever it changes
  useEffect(() => {
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

  // 🧮 Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,

        // 🔍 SEARCH
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useCart = () => useContext(CartContext);
