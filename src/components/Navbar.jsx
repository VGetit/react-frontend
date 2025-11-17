// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { authToken, logout } = useAuth(); // User objesini buradan alıyoruz
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <div className="container-xxl">
      <a href="/" className="navbar-brand p-0">
        <h1 className="m-0"><i className="fa fa-server me-3"></i>VGetit</h1>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <a href="/" className="nav-item nav-link">Search</a>
            {authToken ? (
            <div className="d-flex align-items-center ms-3">
              <a href="#" onClick={handleLogout} className="nav-item nav-link">
                Logout
              </a>
            </div>
          ) : (
            <>
              <a href="/login" className="nav-item nav-link">Login</a>
              <a href="/signup" className="nav-item nav-link">Register</a>
            </>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;