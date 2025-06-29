import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/contact.css'; // Using same CSS as Contact page

const Appointments = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    status: 'SCHEDULED',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:8081/api/appointment', formData);
      toast.success('✅ Appointment created successfully!');
      setFormData({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        status: 'SCHEDULED',
      });
      navigate('/appointments');
    } catch (error) {
      toast.error('❗ Failed to create appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-box">
          <h2>Create Appointment</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="patientId"
              placeholder="Patient ID"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="doctorId"
              placeholder="Doctor ID"
              value={formData.doctorId}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="SCHEDULED">SCHEDULED</option>
            </select>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Appointment...' : 'Create Appointment'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Appointments;
