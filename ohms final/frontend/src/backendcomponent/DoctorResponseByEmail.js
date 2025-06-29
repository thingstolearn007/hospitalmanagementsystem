// src/components/DoctorResponseByEmail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorResponseByEmail = ({ email, token }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorResponse = await axios.get(
          `http://localhost:8081/api/doctor/email`,
          {
            params: { email },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(doctorResponse.data);
      } catch (error) {
        console.error('Error fetching doctor info', error);
        setError('Could not fetch doctor information');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [email, token]);

  if (loading) return <p>Loading doctor info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-card">
      <h4>Welcome, Dr. {doctor.fullName} 👩‍⚕️</h4>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
    </div>
  );
};

export default DoctorResponseByEmail;
