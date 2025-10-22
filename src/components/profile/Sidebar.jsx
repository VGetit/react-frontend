import React from 'react';


function Sidebar({ totalScore, scoreDetails, contact, socials }) {
  return (
    <>
      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.3s">
        <div className="score-display">
          <h1 className="display-4 fw-bold text-primary mb-0">{totalScore}</h1>
          <span className="fs-5 text-dark">/ 5.0</span>
        </div>
        <hr />
      </div>

      

      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.5s">
        <h4 className="card-title">Social Links</h4>
        <div className="social-buttons">
          <a className="social-btn" href={socials.facebook}><i className="fab fa-facebook-f"></i></a>
          <a className="social-btn" href={socials.twitter}><i className="fab fa-twitter"></i></a>
          <a className="social-btn" href={socials.linkedin}><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;