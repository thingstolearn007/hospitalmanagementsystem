import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/patientlist.css';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Required for PDF table

const initialPatients = [
  { name: 'John Doe', email: 'john@example.com', age: 34, gender: 'Male', lastVisit: '2024-04-10' },
  { name: 'Jane Smith', email: 'jane@example.com', age: 29, gender: 'Female', lastVisit: '2024-03-30' },
  { name: 'Michael Brown', email: 'michael@clinic.com', age: 42, gender: 'Male', lastVisit: '2024-04-01' }
];

const PatientListPage = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(patients[index]);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (index) => {
    const updated = [...patients];
    updated[index] = editData;
    setPatients(updated);
    setEditingIndex(null);
  };

  const confirmDelete = (index) => setDeleteIndex(index);
  const cancelDelete = () => setDeleteIndex(null);
  const doDelete = () => {
    setPatients(patients.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Patient List', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Name', 'Email', 'Age', 'Gender', 'Last Visit']],
      body: patients.map(p => [p.name, p.email, p.age, p.gender, p.lastVisit])
    });
    doc.save('patients.pdf');
  };

  const filteredPatients = patients.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.email.toLowerCase().includes(search.toLowerCase())) &&
    (filterGender === '' || p.gender === filterGender)
  );

  return (
    <>
      <Navbar />
      <div className="patient-list-container">
        <h2 className="patient-list-title">All Patients</h2>

        <div className="controls-row">
          <input
            className="search-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button onClick={exportToPDF} className="export-btn">📥 Export to PDF</button>
        </div>

        <div className="patient-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  {editingIndex === index ? (
                    <>
                      <td><input name="name" value={editData.name} onChange={handleChange} /></td>
                      <td><input name="email" value={editData.email} onChange={handleChange} /></td>
                      <td><input name="age" value={editData.age} onChange={handleChange} /></td>
                      <td><input name="gender" value={editData.gender} onChange={handleChange} /></td>
                      <td><input name="lastVisit" value={editData.lastVisit} onChange={handleChange} /></td>
                      <td>
                        <button className="edit-btn" onClick={() => handleSave(index)}>Save</button>
                        <button className="delete-btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.lastVisit}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                        <button className="delete-btn" onClick={() => confirmDelete(index)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {deleteIndex !== null && (
          <div className="modal">
            <div className="modal-content">
              <h4>Confirm Delete</h4>
              <p>Are you sure you want to delete this patient?</p>
              <div className="modal-buttons">
                <button className="delete-btn" onClick={doDelete}>Yes, Delete</button>
                <button className="edit-btn" onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PatientListPage;
