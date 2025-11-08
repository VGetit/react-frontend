// src/components/RecentCompanies.jsx
import React from 'react';
import CompanyCard from './CompanyCard';

function RecentCompanies() {
  // Bu veriler ileride Django API'den gelecek. Şimdilik sahte veri kullanıyoruz.
  const sampleCompanies = [
    { id: 1, name: 'XYZ Teknoloji A.Ş.', category: 'Yazılım & Danışmanlık', score: 4.8, logoText: 'XYZ' },
    { id: 2, name: 'ABC Kargo', category: 'Lojistik Hizmetleri', score: 3.5, logoText: 'ABC' },
    { id: 3, name: 'Hızlı Hosting', category: 'Web Servisleri', score: 4.2, logoText: 'HH' },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Recently Viewed</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {sampleCompanies.map((company, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(index * 0.2) + 0.2}s`} key={company.id}>
              <CompanyCard
                name={company.name}
                category={company.category}
                score={company.score}
                logoText={company.logoText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentCompanies;