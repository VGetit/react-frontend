// src/components/RecentCompanies.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import apiClient from '../api/axiosConfig';

function RecentCompanies() {
  const [recentCompanies, setRecentCompanies] = useState([]);

  useEffect(() => {
        const fetchRecent = async () => {
            try {
                const response = await apiClient.get('http://127.0.0.1:8000/companies/recent');
                setRecentCompanies(response.data);
            } catch (error) {
                console.error("Error on fetching recently updated companies!", error);
            }
        };
        fetchRecent();
    }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Recently Updated</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {recentCompanies.map((company, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(index * 0.2) + 0.2}s`} key={index}>
              <CompanyCard
                name={company.name}
                domain={company.slug}
                score={company.score}
                logoText={company.name.charAt(0)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentCompanies;