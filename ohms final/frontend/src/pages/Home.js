import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import '../styles/home.css'; // adjust path if needed

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <ContactForm />
    <Footer />
  </>
);

export default Home;
