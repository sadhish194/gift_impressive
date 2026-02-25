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
  const { searchQuery, setSearchQuery, totalItems } = useCart();
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

        {/* PREMIUM LOGO */}
        <h2 className="logo">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="logo-wrapper"
          >
            <div className="logo-badge">IG</div>

            <div className="logo-content">
              <span className="logo-title">Impressive</span>
              <span className="logo-tag">GIFT COLLECTION</span>
            </div>
          </Link>
        </h2>

        {/* DESKTOP MENU */}
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Our Products</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">

          <input
            type="text"
            placeholder="Search luxury gifts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

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

          <Link to="/cart" className="cart-wrapper">
            <FaShoppingCart className="icon" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>

          <button
            className="nav-user"
            onClick={handleUserClick}
          >
            <FaUser className="user-icon" />
            <div className="user-text">
              <span className="user-title">
                {isAuthenticated
                  ? user?.email?.split("@")[0]
                  : "Account"}
              </span>
              <span className="user-action">
                {isAuthenticated ? "Logout" : "Login"}
              </span>
            </div>
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`mobile-drawer ${menuOpen ? "slide-in" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER WITH SAME LOGO */}
          <div className="mobile-header">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="logo-wrapper"
            >
              <div className="logo-badge">IG</div>

              <div className="logo-content">
                <span className="logo-title">Impressive</span>
                <span className="logo-tag">GIFT COLLECTION</span>
              </div>
            </Link>

            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* NAVIGATION */}
          <ul className="mobile-nav">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Our Products</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>

          {/* LOGIN BUTTON */}
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

    </nav>
  );
}