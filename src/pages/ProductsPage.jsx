import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";


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