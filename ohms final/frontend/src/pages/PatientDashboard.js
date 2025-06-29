import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/patientdashboard.css';
import { toast } from 'react-toastify';

const PatientDashboard = () => {
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));  // Get user data from localStorage

    if (!user) {
      toast.error('Unauthorized access');
      setIsAuthorized(false);
      return;
    }

    if (user.role !== '0') {  // Ensure only the 'patient' role can access the dashboard
      toast.error('Unauthorized access');
      setIsAuthorized(false);
      return;
    }

    setPatient({
      name: user.fullName || 'Patient Name',
      email: user.email || 'patient@example.com',
      age: user.age || '30',
      gender: user.gender || 'Male'
    });
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="patient-dashboard">
        <h2>Welcome, {patient.name}</h2>
        <p>Email: {patient.email}</p>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
      </div>
      <Footer />
    </>
  );
};

export default PatientDashboard;
