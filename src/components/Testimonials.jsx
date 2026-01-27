const reviews = [
  {
    name: "Karthik",
    feedback: "Amazing quality and fast delivery! Loved the gift wrapping.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Gopinath",
    feedback: "Great collection of personalized gifts. My friend was so happy!",
    rating: "⭐⭐⭐⭐"
  },
  {
    name: "Sadhish",
    feedback: "Affordable prices and excellent customer support.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Monisha",
    feedback: "Delivery was on time and product quality exceeded expectations.",
    rating: "⭐⭐⭐⭐"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <p>"{review.feedback}"</p>
            <span className="rating">{review.rating}</span>
            <h4>- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

