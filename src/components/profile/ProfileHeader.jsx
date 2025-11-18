// src/components/profile/ProfileHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileHeader({ companyName, totalScore, verificationCount, reviewCount }) {
  return (
    <div className="hero-header modern-hero mb-5 py-5">
      <div className="container px-lg-5">
        <div className="row g-5 mt-4">
          <div className="col-lg-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <Link className="text-white opacity-75" to="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-white active" aria-current="page">
                  Company Profile
                </li>
              </ol>
            </nav>
            
            <h1 className="display-4 text-white mb-4 animated fadeIn">{companyName}</h1>
            
            <div className="company-quick-info animated fadeInUp">
              <div className="quick-info-item">
                <h3 className="text-white mb-0">{totalScore || '-'}</h3>
                <p className="mb-0 text-white opacity-75">Trust Score</p>
              </div>
              
              <div className="quick-info-item">
                <h3 className="text-white mb-0">{verificationCount}</h3>
                <p className="mb-0 text-white opacity-75">Verifications</p>
              </div>
              
              <div className="quick-info-item">
                <h3 className="text-white mb-0">{reviewCount}</h3>
                <p className="mb-0 text-white opacity-75">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;