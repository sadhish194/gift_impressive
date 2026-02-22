import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔑 Dynamic storage key
  const storageKey = useMemo(() => {
    if (isAuthenticated && user?._id) {
      return `user_cart_${user._id}`;
    }
    return "guest_cart";
  }, [isAuthenticated, user]);

  // 📦 Load cart
  useEffect(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(storageKey);
      setCart(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error("Cart load error:", error);
      setCart([]);
    }
    setLoading(false);
  }, [storageKey]);

  // 💾 Save cart
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey, loading]);

  // ➕ Add to cart (FINAL NORMALIZED VERSION)
  const addToCart = (product) => {
    const normalizedProduct = {
      _id: product._id,
      name: product.productName || product.name || product.title || "Product",
      price: product.price,
      image: product.image,
      stock: product.stock ?? 0,
    };

    setCart((prev) => {
      const exists = prev.find(
        (item) => item._id === normalizedProduct._id
      );

      if (exists) {
        return prev.map((item) =>
          item._id === normalizedProduct._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...normalizedProduct, qty: 1 }];
    });
  };

  // ➖ Remove
  const removeFromCart = (_id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== _id)
    );
  };

  // 🔄 Update quantity
  const updateQty = (_id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // 🧮 Totals
  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

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
        clearCart,
        totalItems,
        totalPrice,
        searchQuery,
        setSearchQuery,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);