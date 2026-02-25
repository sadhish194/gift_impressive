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
      <div className="products-container">

        <h2 className="products-title">Our Products</h2>

        <div className="product-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">

          {/* Loading Skeleton */}
          {loading &&
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-card">
                <div className="img-wrapper">
                  <div className="skeleton-img" />
                </div>
                <div className="product-info">
                  <div className="skeleton-title" />
                  <div className="skeleton-price" />
                </div>
              </div>
            ))}

          {/* Error */}
          {!loading && error && (
            <p className="text-center text-red-500 full-width">
              {error}
            </p>
          )}

          {/* Real Products */}
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
                      src={product.image || "https://via.placeholder.com/300"}
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
                    <div className="price">₹{product.price}</div>
                  </div>
                </div>
              </Link>
            ))}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <p className="text-center full-width">
                No products found 😕
              </p>
            )}

        </div>
      </div>
    </section>
  );
}