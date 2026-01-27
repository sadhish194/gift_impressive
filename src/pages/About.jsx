import React from "react";
import logo from "../assets/logo.png"; // adjust path if needed

export default function About() {
  return (
    <div className="about">
      <div className="about-header">
        <img src={logo} alt="Impressive Gift Logo" className="about-logo" />

        <h1>About Impressive Gift</h1>
        <p>Turning your moments into meaningful memories</p>
      </div>

      <div className="about-content">
        <p>
          <strong>Impressive Gift</strong> is your trusted destination for
          personalized and thoughtfully curated gifts designed to make every
          occasion special. We believe the best gifts tell a story and create
          lasting memories.
        </p>

        <p>
          From birthdays and anniversaries to corporate events and festive
          celebrations, our customized gift collections are crafted with care,
          creativity, and premium quality.
        </p>

        <p>
          Our mission is to deliver meaningful gifting experiences that bring
          smiles, strengthen relationships, and leave a lasting impression.
        </p>
      </div>

      <div className="about-values">
        <div className="value-card">
          <h3>Quality</h3>
          <p>Premium materials and expert craftsmanship.</p>
        </div>

        <div className="value-card">
          <h3>Personalization</h3>
          <p>Gifts tailored to emotions and special moments.</p>
        </div>

        <div className="value-card">
          <h3>Customer Trust</h3>
          <p>Reliable service, secure payments, and fast delivery.</p>
        </div>
      </div>
    </div>
  );
}
