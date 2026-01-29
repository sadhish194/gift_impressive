import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Product Images
import p1 from "../assets/products/custom-mug.jpg";
import p2 from "../assets/products/gift-hamper.jpg";
import p3 from "../assets/products/photo-frame.jpg";
import p4 from "../assets/products/teddy-bear.jpg";
import p5 from "../assets/products/Chocolate-bouquet.jpg";
import p6 from "../assets/products/Framed-photo-birthday-gift.jpg";
import p7 from "../assets/products/Multiple-wrapped-gift-sets.jpg";
import p8 from "../assets/products/photo-bouquet-chocolates.jpg";
import p9 from "../assets/products/Luxury-mixed-gift-box-with-ribbons.jpg";
import p10 from "../assets/products/custom-photo-message-bottle.jpg";
import p11 from "../assets/products/personalized-3d-led-photo-frame.jpg";
import p12 from "../assets/products/mini-polaroid-photo-keychain.jpg";
import p13 from "../assets/products/wooden-couple-photo-keychain.jpg";
import p14 from "../assets/products/love-memory-keychain-set.jpg";
import p15 from "../assets/products/photo-calendar-memory-frame.jpg";
import p16 from "../assets/products/anniversary-photo-story-frame.jpg";
import p17 from "../assets/products/premium-mens-gift-set.jpg";
import p18 from "../assets/products/luxury-watch-fragrance-gift-box.jpg";
import p19 from "../assets/products/elegant-curated-gift-hamper.jpg";

// Product Data
const products = [
  { id: 1, name: "Custom Mug", price: 899, rating: 4.8, reviews: 124, image: p1, category: "Personalized" },
  { id: 2, name: "Gift Hamper", price: 1499, rating: 4.9, reviews: 89, image: p2, category: "Corporate" },
  { id: 3, name: "Photo Frame", price: 649, rating: 4.7, reviews: 156, image: p3, category: "Anniversary" },
  { id: 4, name: "Teddy Bear", price: 799, rating: 4.6, reviews: 73, image: p4, category: "Birthday" },
  { id: 5, name: "Chocolate Bouquet", price: 1199, rating: 4.8, reviews: 121, image: p5, category: "Birthday" },
  { id: 6, name: "Framed Photo Birthday Gift", price: 999, rating: 4.7, reviews: 86, image: p6, category: "Birthday" },
  { id: 7, name: "Premium Wrapped Gift Sets", price: 1899, rating: 4.8, reviews: 112, image: p7, category: "Anniversary" },
  { id: 8, name: "Photo Bouquet with Chocolates", price: 1599, rating: 4.9, reviews: 134, image: p8, category: "Birthday" },
  { id: 9, name: "Luxury Mixed Gift Box", price: 2199, rating: 4.9, reviews: 98, image: p9, category: "Birthday" },
  { id: 10, name: "Custom Photo Message Bottle", price: 1299, rating: 4.8, reviews: 94, image: p10, category: "Personalized" },
  { id: 11, name: "Personalized 3D LED Photo Frame", price: 1799, rating: 4.9, reviews: 143, image: p11, category: "Anniversary" },
  { id: 12, name: "Mini Polaroid Photo Keychain", price: 699, rating: 4.7, reviews: 167, image: p12, category: "Personalized" },
  { id: 13, name: "Wooden Couple Photo Keychain", price: 799, rating: 4.8, reviews: 119, image: p13, category: "Personalized" },
  { id: 14, name: "Love Memory Keychain Set", price: 899, rating: 4.7, reviews: 102, image: p14, category: "Personalized" },
  { id: 15, name: "Photo Calendar Memory Frame", price: 1499, rating: 4.9, reviews: 136, image: p15, category: "Anniversary" },
  { id: 16, name: "Anniversary Photo Story Frame", price: 1999, rating: 4.9, reviews: 158, image: p16, category: "Anniversary" },
  { id: 17, name: "Premium Men’s Gift Set", price: 2499, rating: 4.8, reviews: 88, image: p17, category: "Corporate" },
  { id: 18, name: "Luxury Watch & Fragrance Gift Box", price: 3299, rating: 4.9, reviews: 76, image: p18, category: "Corporate" },
  { id: 19, name: "Elegant Curated Gift Hamper", price: 2199, rating: 4.7, reviews: 64, image: p19, category: "Corporate" },
];

const CATEGORIES = ["All", "Birthday", "Anniversary", "Personalized", "Corporate"];

export default function ProductsPage() {
  const { addToCart, searchQuery } = useCart();
  const { category } = useParams();

  const [activeCategory, setActiveCategory] = useState("All");

  // 🔗 Sync category with URL
  useEffect(() => {
    if (category) {
      setActiveCategory(
        category.charAt(0).toUpperCase() + category.slice(1)
      );
    } else {
      setActiveCategory("All");
    }
  }, [category]);

  // 🔍 Category filter
  const categoryFiltered =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // 🔎 Search filter
  const filteredProducts = categoryFiltered.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="products">
      <h2>Our Products</h2>

      {/* CATEGORY FILTER TABS */}
      <div className="product-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <div className="product-card">
                <div className="img-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="overlay">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h4>{product.name}</h4>

                  <div className="rating">
                    ⭐ {product.rating}
                    <span> ({product.reviews})</span>
                  </div>

                  <div className="price">
                    ₹{product.price}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No products found 😕
          </p>
        )}
      </div>
    </section>
  );
}