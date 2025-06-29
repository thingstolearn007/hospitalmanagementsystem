import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => (
  <section className="hero">
    <h2>Your Health, Our Priority</h2>
    <p>Providing top-notch healthcare services with expert doctors and modern facilities.</p>
    <Link to="/appointments" className="btn">Book an Appointment</Link>
  </section>
);

export default Hero;
