import { Link } from "react-router-dom";
import heroImg from "../assets/hero/hero-gift.jpg";

export default function Hero() {
  return (
    <section className="px-6 md:px-16 py-16">
      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gray-100">
        
        {/* IMAGE */}
        <img
          src={heroImg}
          alt="Gift"
          className="w-full h-[530px] object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center text-center px-6">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Find the Perfect Gift <br /> for Every Occasion
          </h1>

          <div className="flex gap-4">
            <Link to="/products">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-600 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
