import React, { useState, useEffect } from 'react';
import '../styles/admindashboard.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserMd, faUser, faPlus, faEdit, faTrash, faSearch
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log("🚀 Logged-in user:", user); // Debug — remove later

      // Make role comparison case-insensitive
      if (!user || !['admin', 'super admin'].includes(user.role.toLowerCase())) {
        alert('Access Denied. Admins only!');
        navigate('/login');  // Redirect to login page if not admin
      }
    } catch (err) {
      console.error('❌ Error reading user from localStorage:', err);
      alert('Access Denied. Admins only!');
      navigate('/login');  // Redirect to login page
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Dermatology' },
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: 'Alice Brown', age: 32 },
    { id: 2, name: 'Bob White', age: 45 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formType, setFormType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', specialty: '', age: '' });

  const openForm = (type, item = null) => {
    setFormType(type);
    setEditingItem(item);
    setFormData(item || { name: '', specialty: '', age: '' });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formType === 'doctor') {
      if (editingItem) {
        setDoctors(doctors.map((d) =>
          d.id === editingItem.id ? { ...editingItem, ...formData } : d
        ));
      } else {
        setDoctors([...doctors, { id: Date.now(), ...formData }]);
      }
    } else {
      if (editingItem) {
        setPatients(patients.map((p) =>
          p.id === editingItem.id ? { ...editingItem, ...formData } : p
        ));
      } else {
        setPatients([...patients, { id: Date.now(), ...formData }]);
      }
    }
    setShowModal(false);
  };

  const handleDelete = (id, type) => {
    if (type === 'doctor') setDoctors(doctors.filter((d) => d.id !== id));
    else setPatients(patients.filter((p) => p.id !== id));
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search doctors or patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctors */}
      <div className="section">
        <div className="section-header">
          <h2><FontAwesomeIcon icon={faUserMd} /> Doctors</h2>
          <button onClick={() => openForm('doctor')}>
            <FontAwesomeIcon icon={faPlus} /> Add Doctor
          </button>
        </div>
        <div className="card-container">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="card">
              <p><strong>{doc.name}</strong></p>
              <p>Specialty: {doc.specialty}</p>
              <div className="actions">
                <button onClick={() => openForm('doctor', doc)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete(doc.id, 'doctor')}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patients */}
      <div className="section">
        <div className="section-header">
          <h2><FontAwesomeIcon icon={faUser} /> Patients</h2>
          <button onClick={() => openForm('patient')}>
            <FontAwesomeIcon icon={faPlus} /> Add Patient
          </button>
        </div>
        <div className="card-container">
          {filteredPatients.map((p) => (
            <div key={p.id} className="card">
              <p><strong>{p.name}</strong></p>
              <p>Age: {p.age}</p>
              <div className="actions">
                <button onClick={() => openForm('patient', p)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete(p.id, 'patient')}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingItem ? 'Edit' : 'Add'} {formType === 'doctor' ? 'Doctor' : 'Patient'}</h3>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            {formType === 'doctor' ? (
              <input name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleInputChange} />
            ) : (
              <input name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
            )}
            <div className="modal-actions">
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
