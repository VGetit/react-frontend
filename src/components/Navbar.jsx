// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <a href="/" className="navbar-brand p-0">
        <h1 className="m-0"><i className="fa fa-server me-3"></i>VGetit</h1>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <a href="/" className="nav-item nav-link active">Home</a>
          <a href="#" className="nav-item nav-link">About</a>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profiles</a>
            <div className="dropdown-menu m-0">
              <a href="profil.html" className="dropdown-item">Profile V1</a>
              <a href="profil-onayli.html" className="dropdown-item">Profile V2 (Verified)</a>
            </div>
          </div>
          <a href="#" className="nav-item nav-link">Contact</a>
        </div>
        <a href="" className="btn btn-secondary py-2 px-4 ms-3">Register</a>
      </div>
    </nav>
  );
}

export default Navbar;