// src/components/profile/ProfileBody.jsx
import React from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function ProfileBody({ companyData }) {
  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5">
          <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.1s">
            <MainContent
              about={companyData.about}
              verifications={companyData.verifications}
              reviews={companyData.reviews}
              contacts={companyData.contacts}
            />
          </div>
          <div className="col-lg-4">
            <Sidebar
              totalScore={companyData.totalScore}
              scoreDetails={`<strong>${companyData.scoreFromVerifications} Puan</strong> (Approves) + <strong>${companyData.scoreFromReviews} Puan</strong> (Comments)`}
              contact={companyData.contact}
              socials={companyData.socials}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;