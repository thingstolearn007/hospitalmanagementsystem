import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/Family_Health_Care.png';
import background from '../images/Background.jpg';
import '../styles/form.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('❗ Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('❗ Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/login', {
        email,
        password,
      });

      const token = response.data;

      if (token && typeof token === 'string') {
        localStorage.setItem('token', token);

        let role = '';
        if (token.startsWith('DOCTOR')) {
          role = 'DOCTOR';
        } else if (token.startsWith('1')) {
          role = 'ADMIN';
        } else if (token.startsWith('0')) {
          role = 'PATIENT';
        } else {
          toast.error('❌ Unknown role in token');
          return;
        }

        localStorage.setItem('role', role);
        toast.success(`✅ Logged in as ${role}`);

        // Navigate to role-specific dashboard
        switch (role) {
          case 'DOCTOR':
            navigate('/doctor-dashboard');
            break;
          case 'ADMIN':
            navigate('/admin-dashboard');
            break;
          case 'PATIENT':
            navigate('/patient-dashboard');
            break;
          default:
            toast.error('❌ No redirection path for this role');
        }
      } else {
        toast.error('❌ Login failed! No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('❌ Invalid credentials or user not found!');
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
              <div className="input-icon">
                <FaUser size={24} />
              </div>
              <input
                type="email"
                className="input-field"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FaKey size={24} />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                onCopy={(e) => e.preventDefault()}
              />
            </div>

            <button type="button" className="btn-submit" onClick={handleLogin}>
              Login
            </button>

            <div className="mt-4 text-center">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
