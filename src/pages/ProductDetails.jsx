import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  // 🔥 FETCH PRODUCT FROM BACKEND
  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // BUY NOW HANDLER
  const handleBuyNow = () => {
    addToCart({ ...product, qty: 1, buyNow: true });

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/checkout/${product._id}` }
      });
    } else {
      navigate(`/checkout/${product._id}`);
    }
  };

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

      {/* Breadcrumb */}
      <p className="pd-breadcrumb">
        Home / Products / {product.category} /
        <span> {product.productName}</span>
      </p>

      <div className="pd-layout">

        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
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