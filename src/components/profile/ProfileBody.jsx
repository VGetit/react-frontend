// src/components/profile/ProfileBody.jsx
import React from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function ProfileBody({ companyData, isProcessing }) {
  const renderPlaceholder = () => (
    <div className="text-center py-5">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Gathering company information...</p>
    </div>
  );

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5">
          <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.1s">
            {isProcessing ? renderPlaceholder() : (
              <MainContent
                slug={companyData.slug}
                about={companyData.about}
                location={companyData.location}
                phones={companyData.phones}
                verifications={companyData.verifications}
                reviews={companyData.reviews}
                contacts={companyData.contacts}
              />
            )}
          </div>
          <div className="col-lg-4">
            <Sidebar
              totalScore={companyData.totalScore}
              scoreDetails={
                isProcessing 
                  ? 'Calculating scores...'
                  : `<strong>${companyData.scoreFromVerifications} Points</strong> (Verifications) + <strong>${companyData.scoreFromReviews} Points</strong> (Reviews)`
              }
              contact={companyData.contact}
              socials={companyData.socials}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;