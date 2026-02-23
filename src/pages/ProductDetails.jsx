import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setImage(res.data.image);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product);

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/checkout/${product._id}` }
      });
    } else {
      navigate(`/checkout/${product._id}`);
    }
  };

  /* 🔥 LOADING SKELETON */
  if (loading) {
    return (
      <div className="pd-page">
        <div className="pd-layout">
          <div className="pd-left">
            <div style={{ height: "400px", background: "#e5e5e5" }} />
          </div>

          <div className="pd-right">
            <div style={{ height: "30px", background: "#e5e5e5", marginBottom: "20px" }} />
            <div style={{ height: "20px", background: "#e5e5e5", marginBottom: "20px", width: "50%" }} />
            <div style={{ height: "20px", background: "#e5e5e5", marginBottom: "20px", width: "70%" }} />
            <div style={{ height: "40px", background: "#e5e5e5", width: "200px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product not found</h2>
        <Link to="/products">Go back</Link>
      </div>
    );
  }

  return (
    <div className="pd-page">

      <p className="pd-breadcrumb">
        Home / Products / {product.category} /
        <span> {product.productName}</span>
      </p>

      <div className="pd-layout">

        <div className="pd-left">
          <div className="pd-main-image">
            {image && <img src={image} alt={product.productName} />}
          </div>

          <div className="pd-thumbnails">
            <div
              className={`pd-thumbnail ${image === product.image ? "active" : ""}`}
              onClick={() => setImage(product.image)}
            >
              <img src={product.image} alt="thumbnail" />
            </div>
          </div>
        </div>

        <div className="pd-right">

          <h1 className="pd-title">{product.productName}</h1>

          <div className="pd-rating">
            {Array(5).fill("").map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 18 17"
                fill={product.rating > i ? "#f59e0b" : "#e5e7eb"}
              >
                <path d="M9 0l2.3 5h5.3l-4.3 3.3 1.6 5L9 10.7 4.1 13.3l1.6-5L1.4 5h5.3L9 0z" />
              </svg>
            ))}
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="pd-price">
            ₹{product.price?.toLocaleString("en-IN")}
            <span>(inclusive of all taxes)</span>
          </div>

          <p className="pd-about">About Product</p>

          <ul className="pd-features">
            {product.features?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div className="pd-buttons">
            <button
              className="pd-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="pd-buy-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          <Link to="/products" className="pd-back">
            ← Back to products
          </Link>

        </div>
      </div>
    </div>
  );
}