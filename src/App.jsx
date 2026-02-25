import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";
import { useCart } from "./context/CartContext";

// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import Login from "./pages/Login";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import CartUsers from "./pages/admin/CartUsers";
import Orders from "./pages/admin/Orders";


/* ---------- USER LAYOUT ---------- */
const UserLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
};

/* ---------- CART ROUTE GUARD ---------- */
const CartRouteGuard = ({ children }) => {
  const { loading } = useCart();

  // Block rendering until cart is fully hydrated
  if (loading) {
    return null;
  }

  return children;
};

function App() {
  return (
    
      <BrowserRouter>
        <Routes>

          {/* -------- USER ROUTES -------- */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/products" element={<UserLayout><ProductsPage /></UserLayout>} />
          <Route path="/product/:id" element={<UserLayout><ProductDetails /></UserLayout>} />
          <Route path="/category/:category" element={<UserLayout><ProductsPage /></UserLayout>} />

          {/* ✅ CART ROUTE (GUARDED) */}
          <Route
            path="/cart"
            element={
              <CartRouteGuard>
                <UserLayout>
                  <Cart />
                </UserLayout>
              </CartRouteGuard>
            }
          />

          {/* CHECKOUT */}
          <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
          <Route path="/checkout/:id" element={<UserLayout><Checkout /></UserLayout>} />

          <Route path="/payment" element={<UserLayout><Payment /></UserLayout>} />
          <Route path="/about" element={<UserLayout><About /></UserLayout>} />
          <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
          <Route path="/login" element={<UserLayout><Login /></UserLayout>} />

          {/* -------- ADMIN ROUTES -------- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/carts" element={<CartUsers />} />
          <Route path="/admin/orders" element={<Orders />} />

        </Routes>
      </BrowserRouter>
    
  );
}

export default App;