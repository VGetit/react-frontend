// src/components/CompanyCard.jsx
import React from 'react';

function CompanyCard({ name, domain, score, logoText }) {
  let color = '';
  if (score >= 4) { color = 'green';}
  else if (score >= 2.5) { color = 'orange';}
  else { color = 'red'; }

  const url = `/company/${domain}`;

  return (
    <div className="modern-card">
      <div className="score-badge" style={{backgroundColor: color}}>{score} / 5.0</div>
      <div className="company-logo" style={{color: color}}>{logoText}</div>
      <h4 className="company-name">{name}</h4>
      <p className="company-category">{domain}</p>
      <a className="btn btn-primary" href={url}>Go to Profile</a>
    </div>
  );
}

export default CompanyCard;