// src/components/CompanyCard.jsx
import React from 'react';

function CompanyCard({ name, category, score, logoText }) {
  // Puana göre rozet rengini belirle
  const badgeStyle = {
    backgroundColor: score < 4 ? 'var(--secondary)' : 'var(--primary)',
  };

  const logoStyle = {
    color: score < 4 ? 'var(--secondary)' : 'var(--primary)',
  };

  return (
    <div className="modern-card">
      <div className="score-badge" style={badgeStyle}>{score} / 5.0</div>
      <div className="company-logo" style={logoStyle}>{logoText}</div>
      <h4 className="company-name">{name}</h4>
      <p className="company-category">{category}</p>
      <a className="btn btn-primary" href="#">Profile Git</a>
    </div>
  );
}

export default CompanyCard;