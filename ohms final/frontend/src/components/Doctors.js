import React from 'react';
import '../styles/doctors.css';
import Navbar from './Navbar';
import Footer from './Footer';

// Import images from /src/images
import doctor1 from '../images/doctor1.jpg';
import doctor2 from '../images/doctor2.jpg';
import doctor3 from '../images/doctor3.jpg';
import doctor4 from '../images/doctor4.jpg';
import doctor5 from '../images/doctor5.jpg';
import doctor6 from '../images/doctor6.jpg';
import doctor7 from '../images/doctor7.jpg';
import doctor8 from '../images/doctor8.jpg';
import doctor9 from '../images/doctor9.jpg';

const doctors = [
  { name: "Dr. Swetha", specialty: "Allergist", photo: doctor1 },
  { name: "Dr. Harvinder", specialty: "Cardiologist", photo: doctor2 },
  { name: "Dr. Suresh", specialty: "Surgeon", photo: doctor3 },
  { name: "Dr. Saba", specialty: "Pediatrician", photo: doctor4 },
  { name: "Dr. Muskan", specialty: "Dermatologist", photo: doctor5 },
  { name: "Dr. Ravi", specialty: "Neurologist", photo: doctor6 },
  { name: "Dr. Huda", specialty: "Psychiatrist", photo: doctor7 },
  { name: "Dr. Ramraj", specialty: "Physician", photo: doctor8 },
  { name: "Dr. Rahman", specialty: "Oncologist", photo: doctor9 },
];

const Doctors = () => {
  return (
    <>
    <Navbar/>
    <div className="doctor-container">
      <h1 className="doctor-title">Doctor Directory</h1>
      <div className="doctor-grid">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img src={doctor.photo} alt={doctor.name} className="doctor-image" />
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-specialty">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Doctors;
