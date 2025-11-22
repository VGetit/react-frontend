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
  let color = '';
  if (score >= 4) { color = 'green';}
  else if (score >= 2.5) { color = 'orange';}
  else { color = 'red'; }

  return (
    <div className="score-section wow fadeInUp" data-wow-delay="0.3s">
      <div className="text-center">
        <div className="score-circle" style={{borderColor: color}}>
          {isProcessing ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <h1 className="display-4 fw-bold mb-0" style={{color: color}}>
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

function Sidebar({ totalScore, companySlug, scoreDetails, contact, socials, isProcessing }) {
  const socialLinks = SocialLinksComponent(socials);
  const badgeUrl = `http://localhost:8000/embed/company/${companySlug}/`;
  const badgeCode = `<iframe src="${badgeUrl}" width="300" height="280" frameborder="0" style="border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" title="VGetit Trust Badge"></iframe>`;

  const copyBadgeCode = () => {
    navigator.clipboard.writeText(badgeCode).then(() => {
      alert('Badge code copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy code');
    });
  };

  const previewBadge = () => {
    const newWindow = window.open('', 'BadgePreview', 'width=350,height=400');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Badge Preview</title>
        <style>body { margin: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }</style>
      </head>
      <body>
        ${badgeCode}
      </body>
      </html>
    `);
  };

  return (
    <>
      <ScoreCard score={totalScore} isProcessing={isProcessing} />

      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.5s">
        <h4 className="card-title">
          <i className="fas fa-share-alt me-2"></i>Share Your Badge
        </h4>
        <p className="text-muted small mb-3">
          Add this badge to your website to show your trust score:
        </p>
        <button 
          className="btn btn-sm btn-dark w-100 mb-2"
          onClick={copyBadgeCode}
        >
          <i className="fas fa-copy me-2"></i>
          Copy Badge Code
        </button>
        <button 
          className="btn btn-sm btn-outline-dark w-100"
          onClick={previewBadge}
        >
          <i className="fas fa-eye me-2"></i>
          Preview Badge
        </button>
      </div>

      <div className="profile-sidebar-card wow fadeInUp" data-wow-delay="0.5s">
        <h4 className="card-title">Social Links</h4>
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
                    className="btn btn-outline-dark"
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
    </>
  );
}

export default Sidebar;