// src/pages/DoctorDashboard.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorResponseByEmail from '../backendcomponent/DoctorResponseByEmail';
import AppointmentResponseByDoctorId from '../backendcomponent/AppointmentResponseByDoctorId';
import '../styles/dashboard.css';

const DoctorDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!user || user.role !== 'DOCTOR') {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Doctor Dashboard</h2>

        {/* Doctor Info */}
        <DoctorResponseByEmail email={user.email} token={token} />

        {/* Appointments Section */}
        <AppointmentResponseByDoctorId doctorId={user.id} token={token} />

        {/* Notifications */}
        <div className="dashboard-section">
          <h5>🔔 Notifications</h5>
          <p>No new notifications.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
