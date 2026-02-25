import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Offers from "../components/Offers";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      {/* <Offers /> */}
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
