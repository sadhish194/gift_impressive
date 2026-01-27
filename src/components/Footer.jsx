import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <h2>Impressive Gift</h2>
          <p>
            Thoughtfully crafted gifts that turn moments into memories.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Get in Touch</h3>
          <ul className="footer-list">
            <li>Email: impressivegift@gmail.com</li>
            <li>Phone: +91 9514715045</li>
            <li>Address: Puducherry, India</li>
          </ul>
        </div>

        {/* Quick Links (ROUTER) */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-social">
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
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2026 ImpressiveGift. Developed by RK Software Solutions.
      </div>
    </footer>
  );
}
