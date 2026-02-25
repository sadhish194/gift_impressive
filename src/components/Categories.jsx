// import { Link } from "react-router-dom";
// import {
//   FaBirthdayCake,
//   FaHeart,
//   FaGift,
//   FaBriefcase
// } from "react-icons/fa";
// import "../styles/components/categories.css";

// const categories = [
//   {
//     id: 1,
//     title: "Birthday Gifts",
//     slug: "birthday",
//     icon: <FaBirthdayCake />,
//     image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0"
//   },
//   {
//     id: 2,
//     title: "Anniversary",
//     slug: "anniversary",
//     icon: <FaHeart />,
//     image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659"
//   },
//   {
//     id: 3,
//     title: "Personalized",
//     slug: "personalized",
//     icon: <FaGift />,
//     image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
//   },
//   {
//     id: 4,
//     title: "Corporate",
//     slug: "corporate",
//     icon: <FaBriefcase />,
//     image: "https://images.unsplash.com/photo-1526045478516-99145907023c"
//   }
// ];

// export default function Categories() {
//   return (
//     <section className="categories-section">
//       <div className="categories-container">

//         {/* Header */}
//         <div className="categories-header">
//           <h2 className="categories-title">
//             Explore Our Collections
//           </h2>
//           <p className="categories-subtitle">
//             Curated gifting experiences designed with elegance and intention.
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="categories-grid">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               to={`/category/${category.slug}`}
//               className="category-card group"
//             >
//               <img
//                 src={category.image}
//                 alt={category.title}
//                 loading="lazy"
//                 className="category-image"
//               />

//               <div className="category-overlay" />

//               <div className="category-content">
//                 <div className="category-icon">
//                   {category.icon}
//                 </div>

//                 <h3 className="category-title">
//                   {category.title}
//                 </h3>

//                 <span className="category-link">
//                   View Collection →
//                 </span>
//               </div>

//               <div className="category-border" />
//             </Link>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import {
  FaBirthdayCake,
  FaHeart,
  FaGift,
  FaBriefcase
} from "react-icons/fa";
import "../styles/components/categories.css";

const categories = [
  {
    id: 1,
    title: "Birthday Gifts",
    slug: "birthday",
    icon: <FaBirthdayCake />,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0"
  },
  {
    id: 2,
    title: "Anniversary",
    slug: "anniversary",
    icon: <FaHeart />,
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659"
  },
  {
    id: 3,
    title: "Personalized",
    slug: "personalized",
    icon: <FaGift />,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
  },
  {
    id: 4,
    title: "Corporate",
    slug: "corporate",
    icon: <FaBriefcase />,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c"
  }
];

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="categories-container">

        <div className="categories-header">
          <h2 className="categories-title">
            Explore Our Collections
          </h2>
          <p className="categories-subtitle">
            Curated gifting experiences designed with elegance and intention.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="category-card group"
            >
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
              />

              <div className="category-overlay" />

              <div className="category-content">
                <div className="category-icon">
                  {category.icon}
                </div>

                <h3 className="category-title">
                  {category.title}
                </h3>

                <span className="category-link">
                  View Collection →
                </span>
              </div>

              <div className="category-border" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}