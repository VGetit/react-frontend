import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import apiClient from '../api/axiosConfig'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Page-specific components for the profile
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';
import axios from 'axios';

function CompanyProfilePage() {
  const { slug } = useParams();

  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchCompanyData = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const response = await axios.get(`http://127.0.0.1:8000/companies/search/?url=${slug}`);
          const data = response.data.company;
          console.log(data.slug)
          console.log(data.name)
          setCompanyData({
            name: data.name,
            about: '',
            totalScore: data.score,
            scoreFromVerifications: 2.0,
            scoreFromReviews: 2.8,
            contacts: data.contacts,
            socials: data.social_urls,
            verifications: {
              phone: true,
              address: true,
              employees: false,
            },
            reviews: data.comments,
          });
          setIsLoading(false);

        } catch (err) {
          setError('Error on loading company data!');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
  };

  if (slug) {
    fetchCompanyData();
  }

  }, [slug]);

  if (isLoading) {
    return (
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-0">
      <div className="position-relative p-0">
        <Navbar />
        <ProfileHeader companyName={companyData.name} />
      </div>

      <ProfileBody companyData={companyData} />

      <Footer />

      <a href="#" className="btn btn-lg btn-secondary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
}

export default CompanyProfilePage;