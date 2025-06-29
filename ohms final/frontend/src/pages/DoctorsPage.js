// src/pages/DoctorsPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Doctors from '../components/Doctors';
import '../styles/doctors.css';

const DoctorsPage = () => {
  return (
    <>
      <Navbar />
      <div className="doctors-page-background">
        <Doctors />
      </div>
      <Footer />
    </>
  );
};

export default DoctorsPage;
