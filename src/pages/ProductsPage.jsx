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

  // 🔥 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
useEffect(() => {
  axios.get("http://localhost:5000/api/products")
    .then(res => console.log("API DATA:", res.data))
    .catch(err => console.error(err));
}, []);
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

  // 🔍 Category filter (based on DB field)
  const categoryFiltered =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === activeCategory.toLowerCase()
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
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        {error}
      </p>
    );
  }

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

                  {/* <div className="stock">
                    Stock: {product.stock}
                  </div> */}
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