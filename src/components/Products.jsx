// import { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { Link } from "react-router-dom";

// import p1 from "../assets/products/custom-mug.jpg";
// import p2 from "../assets/products/gift-hamper.jpg";
// import p3 from "../assets/products/photo-frame.jpg";
// import p4 from "../assets/products/teddy-bear.jpg";
// import p5 from "../assets/products/Chocolate-bouquet.jpg";
// import p11 from "../assets/products/personalized-3d-led-photo-frame.jpg";
// import p13 from "../assets/products/wooden-couple-photo-keychain.jpg";
// import p16 from "../assets/products/anniversary-photo-story-frame.jpg";

// const products = [
//   {
//     id: 1,
//     name: "Custom Mug",
//     price: 899,
//     rating: 4.8,
//     reviews: 124,
//     image: p1,
//     category: "Personalized",
//   },
//   {
//     id: 2,
//     name: "Gift Hamper",
//     price: 1499,
//     rating: 4.9,
//     reviews: 89,
//     image: p2,
//     category: "Corporate",
//   },
//   {
//     id: 3,
//     name: "Photo Frame",
//     price: 649,
//     rating: 4.7,
//     reviews: 156,
//     image: p3,
//     category: "Anniversary",
//   },
//   {
//     id: 4,
//     name: "Teddy Bear",
//     price: 799,
//     rating: 4.6,
//     reviews: 73,
//     image: p4,
//     category: "Birthday",
//   },
//   {
//     id: 5,
//     name: "Chocolate Bouquet",
//     price: 1199,
//     rating: 4.8,
//     reviews: 121,
//     image: p5,
//     category: "Birthday",
//   },
//   {
//     id: 11,
//     name: "Personalized 3D LED Photo Frame",
//     price: 1799,
//     rating: 4.9,
//     reviews: 143,
//     image: p11,
//     category: "Anniversary",
//   },
//   {
//     id: 13,
//     name: "Wooden Couple Photo Keychain",
//     price: 799,
//     rating: 4.8,
//     reviews: 119,
//     image: p13,
//     category: "Personalized",
//   },
//   {
//     id: 16,
//     name: "Anniversary Photo Story Frame",
//     price: 1999,
//     rating: 4.9,
//     reviews: 158,
//     image: p16,
//     category: "Anniversary",
//   },
// ];

// export default function Products() {
//   const { addToCart, searchQuery } = useContext(CartContext); // ✅ SEARCH
//   const [activeCategory] = useState("All");

//   // ✅ CATEGORY FILTER
//   const categoryFiltered =
//     activeCategory === "All"
//       ? products
//       : products.filter((p) => p.category === activeCategory);

//   // ✅ SEARCH FILTER
//   const filteredProducts = categoryFiltered.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <section className="products">
//       <h2>Our Products</h2>

//       {/* PRODUCTS GRID */}
//       <div className="grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((p) => (
//             <Link to={`/product/${p.id}`} key={p.id}>
//               <div className="product-card">
//                 <div className="img-wrapper">
//                   <img src={p.image} alt={p.name} />

//                   {/* OVERLAY */}
//                   <div className="overlay">
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         addToCart(p);
//                       }}
//                     >
//                       🛒 Add to Cart
//                     </button>
//                   </div>
//                 </div>

//                 <div className="product-info">
//                   <h4>{p.name}</h4>

//                   <div className="rating">
//                     ⭐ {p.rating} <span>({p.reviews})</span>
//                   </div>

//                   <div className="price">₹{p.price}</div>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           // ✅ NO RESULTS
//           <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
//             No products found 😕
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Product Images
import p1 from "../assets/products/custom-mug.jpg";
import p2 from "../assets/products/gift-hamper.jpg";
import p3 from "../assets/products/photo-frame.jpg";
import p4 from "../assets/products/teddy-bear.jpg";
import p5 from "../assets/products/Chocolate-bouquet.jpg";
import p11 from "../assets/products/personalized-3d-led-photo-frame.jpg";
import p13 from "../assets/products/wooden-couple-photo-keychain.jpg";
import p16 from "../assets/products/anniversary-photo-story-frame.jpg";

// Product Data
const products = [
  {
    id: 1,
    name: "Custom Mug",
    price: 899,
    rating: 4.8,
    reviews: 124,
    image: p1,
    category: "Personalized",
  },
  {
    id: 2,
    name: "Gift Hamper",
    price: 1499,
    rating: 4.9,
    reviews: 89,
    image: p2,
    category: "Corporate",
  },
  {
    id: 3,
    name: "Photo Frame",
    price: 649,
    rating: 4.7,
    reviews: 156,
    image: p3,
    category: "Anniversary",
  },
  {
    id: 4,
    name: "Teddy Bear",
    price: 799,
    rating: 4.6,
    reviews: 73,
    image: p4,
    category: "Birthday",
  },
  {
    id: 5,
    name: "Chocolate Bouquet",
    price: 1199,
    rating: 4.8,
    reviews: 121,
    image: p5,
    category: "Birthday",
  },
  {
    id: 11,
    name: "Personalized 3D LED Photo Frame",
    price: 1799,
    rating: 4.9,
    reviews: 143,
    image: p11,
    category: "Anniversary",
  },
  {
    id: 13,
    name: "Wooden Couple Photo Keychain",
    price: 799,
    rating: 4.8,
    reviews: 119,
    image: p13,
    category: "Personalized",
  },
  {
    id: 16,
    name: "Anniversary Photo Story Frame",
    price: 1999,
    rating: 4.9,
    reviews: 158,
    image: p16,
    category: "Anniversary",
  },
];

export default function Products() {
  const { addToCart, searchQuery } = useCart();
  const [activeCategory] = useState("All");

  // 🔍 Filter by category
  const categoryFiltered =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // 🔎 Filter by search
  const filteredProducts = categoryFiltered.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="products">
      <h2>Our Products</h2>

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

                  {/* Add to Cart Overlay */}
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
