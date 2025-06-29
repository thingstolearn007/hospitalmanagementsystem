import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaKey, FaStethoscope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/Family_Health_Care.png';
import background from '../images/Background.jpg';
import '../styles/form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    role: 'PATIENT',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      const result = zxcvbn(e.target.value);
      setPasswordStrength(result.score);
    }
  };

  const validateForm = () => {
    const { fullName, email, phoneNumber, password, confirmPassword } = form;
    let formErrors = {};
    let isValid = true;

    if (!fullName) {
      formErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (!password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords must match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const { fullName, email, phoneNumber, password, specialization, role } = form;
    
    let endpoint = '';
    if (role === 'ADMIN') {
      endpoint = 'http://localhost:8081/api/admin';
    } else if (role === 'DOCTOR') {
      endpoint = 'http://localhost:8081/api/admin/doctor';
    } else if (role === 'PATIENT') {
      endpoint = 'http://localhost:8081/api/patient';
    }

    try {
      await axios.post(endpoint, {
        fullName,
        email,
        phoneNumber,
        password,
        specialization,
      });

      toast.success(`✅ Registration successful! Welcome, ${fullName}!`);
      navigate('/login');

      setForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        specialization: '',
        role: 'PATIENT',
      });
    } catch (error) {
      toast.error(`❌ Registration failed: ${error.response?.data?.message || 'Server Error'}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page" style={{ backgroundImage: `url(${background})` }}>
        <div className="user_card">
          <div className="brand_logo_container">
            <img src={logo} className="brand_logo" alt="Logo" />
          </div>
          <form>
            <div className="input-group">
              <div className="input-icon"><FaUser size={24} /></div>
              <input
                type="text"
                name="fullName"
                className="input-field"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
            </div>

            <div className="input-group">
              <div className="input-icon"><FaEnvelope size={24} /></div>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="input-group">
              <div className="input-icon"><FaPhone size={24} /></div>
              <input
                type="tel"
                name="phoneNumber"
                className="input-field"
                placeholder="Mobile Number"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
            </div>

            <div className="input-group">
              <div className="input-icon"><FaKey size={24} /></div>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                onCopy={(e) => e.preventDefault()}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            {/* Password Strength Bar */}
            {form.password && (
              <div className="mb-2">
                <div style={{
                  height: '6px',
                  width: '100%',
                  borderRadius: '10px',
                  backgroundColor: '#e0e0e0',
                  overflow: 'hidden',
                  marginBottom: '5px'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(passwordStrength + 1) * 20}%`,
                      backgroundColor:
                        passwordStrength < 2
                          ? '#ff4d4d'
                          : passwordStrength === 2
                          ? '#ffc107'
                          : passwordStrength === 3
                          ? '#17a2b8'
                          : '#28a745',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease-in-out'
                    }}
                  />
                </div>
                <small style={{
                  color:
                    passwordStrength < 2
                      ? '#ff4d4d'
                      : passwordStrength === 2
                      ? '#ffc107'
                      : passwordStrength === 3
                      ? '#17a2b8'
                      : '#28a745',
                  fontWeight: '500'
                }}>
                  {['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
                </small>
              </div>
            )}

            <div className="input-group">
              <div className="input-icon"><FaKey size={24} /></div>
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </div>

            <div className="input-group">
              <div className="input-icon"><FaStethoscope size={24} /></div>
              <input
                type="text"
                name="specialization"
                className="input-field"
                placeholder="Specialization (if Doctor)"
                value={form.specialization}
                onChange={handleChange}
              />
            </div>

            <div className="input-group mb-3">
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && <small className="text-danger">{errors.role}</small>}
            </div>

            <button type="button" className="btn-submit" onClick={handleRegister}>
              Register
            </button>

            <div className="mt-4 text-center">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
