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

  // 🔥 Fetch products from backend (Dynamic)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");

        // ✅ ONLY CHANGE: show first 4 products
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

  // 🔍 Category filter
  const categoryFiltered =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // 🔎 Search filter
  const filteredProducts = categoryFiltered.filter((product) =>
    product.productName
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase() || "")
  );

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading products...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="grid">
        {filteredProducts.length > 0 ? (
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
          ))
        ) : (
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