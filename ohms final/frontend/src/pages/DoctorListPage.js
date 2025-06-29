import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/doctorlist.css';

// Doctor images
import doctor1 from '../images/doctor1.jpg';
import doctor2 from '../images/doctor2.jpg';
import doctor3 from '../images/doctor3.jpg';
import doctor4 from '../images/doctor4.jpg';
import doctor5 from '../images/doctor5.jpg';
import doctor6 from '../images/doctor6.jpg';
import doctor7 from '../images/doctor7.jpg';
import doctor8 from '../images/doctor8.jpg';
import doctor9 from '../images/doctor9.jpg';
import fallbackImg from '../images/default-doctor.jpg';

const initialDoctors = [
  { name: "Dr. Swetha", specialty: "Allergist", email: "swetha@familyhealth.com", phone: "9876543210", photo: doctor1 },
  { name: "Dr. Harvinder", specialty: "Cardiologist", email: "harvind@familyhealth.com", phone: "9123456789", photo: doctor2 },
  { name: "Dr. Suresh", specialty: "Surgeon", email: "suresh@familyhealth.com", phone: "9000012345", photo: doctor3 },
  { name: "Dr. Saba", specialty: "Critical Care", email: "saba@familyhealth.com", phone: "9445566677", photo: doctor4 },
  { name: "Dr. Muskan", specialty: "Dermatologist", email: "muskan@familyhealth.com", phone: "9988776655", photo: doctor5 },
  { name: "Dr. Meheak", specialty: "Gastroenterologist", email: "meheak@familyhealth.com", phone: "8765432109", photo: doctor6 },
  { name: "Dr. Huda", specialty: "Nephrologist", email: "huda@familyhealth.com", phone: "9345012345", photo: doctor7 },
  { name: "Dr. Ramraj", specialty: "Physician", email: "ramraj@familyhealth.com", phone: "8123456700", photo: doctor8 },
  { name: "Dr. Rahman", specialty: "Oncologist", email: "rahman@familyhealth.com", phone: "7012345678", photo: doctor9 }
];

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setDarkMode(storedTheme === 'dark');
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const specialties = [...new Set(initialDoctors.map((doc) => doc.specialty))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = !specialtyFilter || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <>
      <Navbar />
      <div className="doctor-list-container">
        <h2 className="doctor-list-title">Our Doctors</h2>

        <div className="controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="specialty-select"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map((spec, i) => (
              <option key={i} value={spec}>{spec}</option>
            ))}
          </select>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="doctor-table">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={doc.photo}
                      onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg; }}
                      alt={doc.name}
                      className="doctor-img"
                    />
                  </td>
                  <td>{doc.name}</td>
                  <td>{doc.specialty}</td>
                  <td>{doc.email}</td>
                  <td>{doc.phone}</td>
                  <td>
                    <button className="edit-btn" onClick={() => alert(`Edit ${doc.name}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(i)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    ❌ No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorListPage;
