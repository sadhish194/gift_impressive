import { Link } from "react-router-dom";
import {
  FaBirthdayCake,
  FaHeart,
  FaGift,
  FaBriefcase
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Birthday Gifts",
    slug: "birthday",
    icon: <FaBirthdayCake />,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
    overlay: "bg-black/40"
  },
  {
    id: 2,
    title: "Anniversary",
    slug: "anniversary",
    icon: <FaHeart />,
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
    overlay: "bg-pink-500/40"
  },
  {
    id: 3,
    title: "Personalized",
    slug: "personalized",
    icon: <FaGift />,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
    overlay: "bg-black/30"
  },
  {
    id: 4,
    title: "Corporate",
    slug: "corporate",
    icon: <FaBriefcase />,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c",
    overlay: "bg-blue-900/40"
  }
];

export default function Categories() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Shop by Categories
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group relative h-52 rounded-xl overflow-hidden shadow-md cursor-pointer"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 ${category.overlay}`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              {/* ICON */}
              <div className="text-3xl mb-2 opacity-90">
                {category.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold tracking-wide">
                {category.title}
              </h3>

              {/* HOVER TEXT */}
              <span className="mt-2 text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
