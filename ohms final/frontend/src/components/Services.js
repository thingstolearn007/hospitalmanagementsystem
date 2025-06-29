import React from 'react';
import '../styles/services.css';

const Services = () => (
  <section className="services">
    <h2>Our Services</h2>
    <div className="service-list">
      <div className="service">
        <h3>Emergency Care</h3>
        <p>24/7 emergency services to provide immediate medical attention.</p>
      </div>
      <div className="service">
        <h3>Specialized Treatments</h3>
        <p>Expert specialists in cardiology, neurology, orthopedics, and more.</p>
      </div>
      <div className="service">
        <h3>Online Consultation</h3>
        <p>Get medical advice from our doctors online without visiting the hospital.</p>
      </div>
    </div>
  </section>
);

export default Services;
