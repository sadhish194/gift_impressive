import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart, searchQuery } = useCart();
  const [products, setProducts] = useState([]);
  const [activeCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryFiltered =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  const filteredProducts = categoryFiltered.filter((product) =>
    product.productName
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="grid">

        {/* 🔥 Loading Skeleton (same design structure) */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-card">
              <div className="img-wrapper">
                <div
                  style={{
                    height: "200px",
                    background: "#e5e5e5",
                  }}
                ></div>
              </div>

              <div className="product-info">
                <div
                  style={{
                    height: "20px",
                    background: "#e5e5e5",
                    marginBottom: "10px",
                  }}
                ></div>
                <div
                  style={{
                    height: "20px",
                    background: "#e5e5e5",
                    width: "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}

        {/* 🔥 Error */}
        {!loading && error && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "red" }}>
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