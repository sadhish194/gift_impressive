import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/components/products.css";

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
    <section className="products-section">
      <div className="products-container">

        <div className="products-header">
          <h2 className="products-title">
            Featured <span className="text-pink-500">Products</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product-link"
              >
                <div className="product-card">

                  <div className="product-image-wrapper">
                    <img
                      src={product.image || "https://via.placeholder.com/400"}
                      alt={product.productName}
                      className="product-image"
                    />
                  </div>

                  <div className="product-body">
                    <h4 className="product-name">
                      {product.productName}
                    </h4>

                    <div className="product-bottom">
                      <span className="product-price">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="add-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}