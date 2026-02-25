import { FaTruck, FaLock, FaGift, FaUndo } from "react-icons/fa";
export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-header">
          <h2 className="why-title">
            Why Choose Impressive Gift?
          </h2>

          <p className="why-subtitle">
            Thoughtfully curated gifts, reliable service,
            and smiles guaranteed.
          </p>
        </div>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">
              <FaTruck />
            </div>
            <h4>Fast Delivery</h4>
            <p>Quick and reliable delivery across India for every occasion.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaLock />
            </div>
            <h4>Secure Payment</h4>
            <p>100% safe and encrypted payments with trusted gateways.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaGift />
            </div>
            <h4>Custom Gifts</h4>
            <p>Personalized gifts crafted to make moments unforgettable.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaUndo />
            </div>
            <h4>Easy Returns</h4>
            <p>Hassle-free returns and customer-first support.</p>
          </div>

        </div>

      </div>
    </section>
  );
}