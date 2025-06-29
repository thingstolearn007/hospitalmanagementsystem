// src/components/AppointmentResponseByDoctorId.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentResponseByDoctorId = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get('http://localhost:8081/api/appointment');

        // If the response is empty or null
        if (!appointmentsResponse.data || appointmentsResponse.data.length === 0) {
          setError('No appointments found.');
        } else {
          setAppointments(appointmentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Could not fetch appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch appointments
    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-section">
      <h5>📅 All Appointments</h5>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((appt) => (
            <li key={appt.id}>
              {new Date(appt.appointmentDate).toLocaleString([], {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              - {appt.patientName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentResponseByDoctorId;
