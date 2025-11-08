import React from 'react';

function SocialLinksComponent(socialLinksString) {
  if (Array.isArray(socialLinksString)) {
    return [...new Set(socialLinksString)];
  }

  try {
    const jsonString = socialLinksString.replace(/'/g, '"');
    const socialLinksArray = JSON.parse(jsonString);
    return [...new Set(socialLinksArray)];
  } catch (error) {
    console.error("Error parsing social links:", error);
    return [];
  }
}

const getPlatformName = (url) => {
  if (url.includes('twitter')) return ['Twitter', 'fab fa-twitter'];
  if (url.includes('facebook')) return ['Facebook', 'fab fa-facebook'];
  if (url.includes('youtube')) return ['YouTube', 'fab fa-youtube'];
  if (url.includes('instagram')) return ['Instagram', 'fab fa-instagram'];
  if (url.includes('linkedin')) return ['LinkedIn', 'fab fa-linkedin'];
  if (url.includes('weibo')) return ['Weibo', 'fab fa-weibo'];
  return ['Website', 'fas fa-globe'];
};

function ScoreCard({ score, isProcessing }) {
  return (
    <div className="score-section wow fadeInUp" data-wow-delay="0.3s">
      <div className="text-center">
        <div className="score-circle">
          {isProcessing ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <h1 className="display-4 fw-bold text-primary mb-0">
              {score || '-'}<small className="fs-5 text-dark">/5.0</small>
            </h1>
          )}
        </div>
        <h4 className="mt-4">Trust Score</h4>
        <p className="text-muted">
          {isProcessing ? 'Calculating trust score...' : 'Based on verifications and reviews'}
        </p>
      </div>
    </div>
  );
}

function Sidebar({ totalScore, scoreDetails, contact, socials, isProcessing }) {
  const socialLinks = SocialLinksComponent(socials);

  return (
    <>
      <ScoreCard score={totalScore} isProcessing={isProcessing} />

      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.5s">
        <h4 className="card-title">Connect & Follow</h4>
        <div className="social-buttons">
          {socialLinks.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {socialLinks.map((url, index) => {
                const [platform, icon] = getPlatformName(url);
                return (
                  <a
                    key={index}
                    href={url.startsWith('http') ? url : `https:${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                    title={platform}
                  >
                    <i className={`${icon} me-2`}></i>
                    {platform}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-muted mb-0">
              {isProcessing ? 'Loading social links...' : 'No social links available'}
            </p>
          )}
        </div>
      </div>

      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.7s">
        <h4 className="card-title">Score Breakdown</h4>
        <div dangerouslySetInnerHTML={{ __html: scoreDetails }} />
      </div>
    </>
  );
}

export default Sidebar;