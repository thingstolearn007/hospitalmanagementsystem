import React from 'react';
import '../styles/about.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import drAnjali from '../images/Dr.Anjali_Mehta.jpeg';
import drRajesh from '../images/Dr.Rajesh_Kumar.jpeg';
import drPriya from '../images/Dr.Priya_Sharma.png';

const About = () => {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <div className="hero-banner d-flex align-items-center justify-content-center text-center">
        <div>
          <h1 className="display-4">Welcome to Family Health Care</h1>
          <p className="lead">Caring for your family like our own</p>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section container text-center py-5">
        <h2 className="section-title">About Us</h2>
        <p className="about-text">
          At Family Health Care, we are committed to providing compassionate, high-quality, and affordable healthcare for the entire family.
          With a legacy of over a decade, our hospital is known for its excellence in medical services and personalized care.
        </p>
        <p className="about-text">
          Our expert team of doctors, nurses, and staff work hand-in-hand to ensure patients receive the best treatment and support in a safe and welcoming environment.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section text-center">
        <div className="container">
          <h2 className="section-title">Meet Our Experts</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 team-member mb-4">
              <img src={drAnjali} alt="Dr. Anjali Mehta" className="img-fluid shadow" />
              <h5 className="mt-3">Dr. Anjali Mehta</h5>
              <p>Chief Medical Officer</p>
            </div>
            <div className="col-md-4 team-member mb-4">
              <img src={drRajesh} alt="Dr. Rajesh Kumar" className="img-fluid shadow" />
              <h5 className="mt-3">Dr. Rajesh Kumar</h5>
              <p>Senior Pediatrician</p>
            </div>
            <div className="col-md-4 team-member mb-4">
              <img src={drPriya} alt="Dr. Priya Sharma" className="img-fluid shadow" />
              <h5 className="mt-3">Dr. Priya Sharma</h5>
              <p>General Surgeon</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
