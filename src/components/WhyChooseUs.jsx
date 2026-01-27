import { FaTruck, FaLock, FaGift, FaUndo } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="why-us">
      <h2>Why Choose Impressive Gift?</h2>

      <p className="why-us-subtitle">
        Thoughtfully curated gifts, reliable service, and smiles guaranteed.
      </p>

      <div className="why-us-grid">
        <div className="why-card">
          <FaTruck className="icon" />
          <h4>Fast Delivery</h4>
          <p>Quick and reliable delivery across India for every occasion.</p>
        </div>

        <div className="why-card">
          <FaLock className="icon" />
          <h4>Secure Payment</h4>
          <p>100% safe and encrypted payments with trusted gateways.</p>
        </div>

        <div className="why-card">
          <FaGift className="icon" />
          <h4>Custom Gifts</h4>
          <p>Personalized gifts crafted to make moments unforgettable.</p>
        </div>

        <div className="why-card">
          <FaUndo className="icon" />
          <h4>Easy Returns</h4>
          <p>Hassle-free returns and customer-first support.</p>
        </div>
      </div>
    </section>
  );
}
