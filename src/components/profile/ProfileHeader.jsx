// src/components/profile/ProfileHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileHeader({ companyName }) {
  return (
    <div className="py-5 bg-primary hero-header modern-hero mb-5">
      <div className="container my-5 py-5 px-lg-5">
        <div className="row g-5">
          <div className="col-lg-12 text-center text-lg-start">
            <h1 className="display-4 text-white animated slideInLeft">{companyName}</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb animated slideInLeft mb-4">
                <li className="breadcrumb-item"><Link className="text-white" to="/">Home</Link></li>
                <li className="breadcrumb-item text-white active" aria-current="page">Company Profile</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;