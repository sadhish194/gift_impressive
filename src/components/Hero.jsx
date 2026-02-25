import { Link } from "react-router-dom";
import heroImg from "../assets/hero/hero-gift.webp";
import "../styles/components/hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* IMAGE */}
        <div className="hero-image-wrapper">
          <img
            src={heroImg}
            alt="Luxury gift collection"
            className="hero-image"
          />
        </div>

        {/* TEXT */}
        <div className="hero-content">

          <p className="hero-subtitle">
            Premium Gifting Collection
          </p>

          <h1 className="hero-title">
            Find the Perfect Gift
            <span className="block">
              for{" "}
              <span className="hero-gradient-text">
                Every Occasion
              </span>
            </span>
          </h1>

          <p className="hero-description">
            Thoughtfully curated gifts crafted to celebrate life’s most
            meaningful moments with elegance and intention.
          </p>

          <div className="hero-buttons">

            <Link to="/products" className="btn-primary">
              Explore Collection
            </Link>

            <Link to="category/corporate" className="btn-secondary">
              Corporate Gifting
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}