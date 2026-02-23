import { Link } from "react-router-dom";
import heroImg from "../assets/hero/hero-gift.webp";

export default function Hero() {
  return (
    <section className="px-6 py-16 md:px-16">
      <div className="relative max-w-6xl mx-auto overflow-hidden bg-gray-100 rounded-3xl">
        
        {/* IMAGE */}
        <img
          src={heroImg}
          alt="Gift"
          className="w-full h-[530px] object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center bg-white/60">
          
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Find the Perfect Gift <br /> for Every Occasion
          </h1>

          <div className="flex gap-4">
            <Link to="/products">
              <button className="px-6 py-3 font-semibold text-white transition bg-pink-500 rounded-full shadow hover:bg-pink-600">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
