import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../api/axios";

const CATEGORIES = ["All", "Birthday", "Anniversary", "Personalized", "Corporate"];

export default function ProductsPage() {
  const { addToCart, searchQuery } = useCart();
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setActiveCategory(
        category.charAt(0).toUpperCase() + category.slice(1)
      );
    } else {
      setActiveCategory("All");
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url =
          activeCategory === "All"
            ? "/products"
            : `/products?category=${activeCategory}`;

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter((product) =>
    product.productName
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <section className="products">
      <h2>Our Products</h2>

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

      <div className="grid">

        {/* 🔥 Skeleton Loader */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-card">
              <div className="img-wrapper">
                <div
                  style={{
                    height: "200px",
                    background: "#e5e5e5",
                  }}
                />
              </div>

              <div className="product-info">
                <div
                  style={{
                    height: "20px",
                    background: "#e5e5e5",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    height: "20px",
                    background: "#e5e5e5",
                    width: "50%",
                  }}
                />
              </div>
            </div>
          ))}

        {/* 🔥 Error */}
        {!loading && error && (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </p>
        )}

        {/* 🔥 Real Products */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-link"
            >
              <div className="product-card">
                <div className="img-wrapper">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/300"
                    }
                    alt={product.productName}
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
                  <h4>{product.productName}</h4>
                  <div className="price">
                    ₹{product.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              No products found 😕
            </p>
          )}
      </div>
    </section>
  );
}