import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaUser,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const { cart, searchQuery, setSearchQuery, totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <h2 className="logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Impressive Gift
          </Link>
        </h2>

        {/* DESKTOP MENU */}
        <ul className="menu">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Our Products</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search gifts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          {/* SOCIAL ICONS */}
          <div className="nav-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919514715045" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
          </div>

          {/* CART */}
          <Link to="/cart" className="cart-wrapper">
            <FaShoppingCart className="icon" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>

          {/* USER LOGIN / LOGOUT */}
          <button
            className="nav-user"
            onClick={handleUserClick}
            title={isAuthenticated ? "Logout" : "Login"}
          >
            <FaUser className="user-icon" />

            <div className="user-text">
              <span className="user-title">
                {isAuthenticated
                  ? user?.email?.split("@")[0]
                  : "Hello,"}
              </span>
              <span className="user-action">
                {isAuthenticated ? "Logout" : "Login"}
              </span>
            </div>
          </button>

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-overlay">
          <div className="mobile-drawer">

            <div className="mobile-header">
              <h2 className="mobile-logo">Impressive Gift</h2>
              <button
                className="mobile-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <ul className="mobile-nav">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/products" onClick={() => setMenuOpen(false)}>Our Products</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
            </ul>

            <div className="mobile-footer">
              <button
                className="mobile-login-btn"
                onClick={handleUserClick}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </div>

          </div>
        </div>
      )}

    </nav>
  );
}