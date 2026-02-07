import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      date: "Jan 10, 2026",
      text: "The product quality was excellent, and the delivery was faster than expected.",
      name: "Karthik",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=3",
      rating: 5
    },
    {
      id: 2,
      date: "Feb 3, 2026",
      text: "A great collection of personalized gifts with multiple customization options.",
      name: "Gopinath",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=11",
      rating: 4
    },
    {
      id: 3,
      date: "Mar 15, 2026",
      text: "The pricing is reasonable and customer support was responsive.",
      name: "Sadhish",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=7",
      rating: 5
    },
    {
      id: 4,
      date: "Jun 18, 2026",
      text: "The order was delivered on time and exceeded expectations.",
      name: "Monisha",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=9",
      rating: 4
    },
    {
      id: 5,
      date: "Jan 22, 2025",
      text: "The website is easy to navigate and ordering is simple.",
      name: "Hanisha",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=5",
      rating: 5
    },
    {
      id: 6,
      date: "Feb 25, 2025",
      text: "Excellent service with attention to detail.",
      name: "Renu",
      role: "Verified Customer",
      img: "https://i.pravatar.cc/150?img=6",
      rating: 4
    }
  ];

  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const maxIndex = testimonials.length - perView;

  const next = () =>
    setIndex(prev => (prev >= maxIndex ? 0 : prev + 1));

  const prev = () =>
    setIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  const visible = testimonials.slice(index, index + perView);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <h2 className="testimonials-title">What Our Customers Say</h2>
        <p className="testimonials-subtitle">
          Real feedback from customers who loved our personalized gifts.
        </p>

        <div className="testimonials-wrapper">

          {perView > 1 && (
            <div className="testimonials-nav">
              <button className="prev" onClick={prev}>←</button>
              <button className="next" onClick={next}>→</button>
            </div>
          )}

          <div
            className="testimonials-grid"
            style={{
              gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`
            }}
          >
            {visible.map(item => (
              <div key={item.id} className="testimonial-card">

                <div className="card-header">
                  <div className="stars">
                    {Array(item.rating).fill(0).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="date">{item.date}</span>
                </div>

                <p className="feedback">“{item.text}”</p>

                <div className="user">
                  <img src={item.img} alt={item.name} />
                  <div>
                    <p className="name">{item.name}</p>
                    <p className="role">{item.role}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {perView === 1 && (
          <div className="dots">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
