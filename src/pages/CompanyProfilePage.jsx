import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';

import '../styles/profile.css';

function ProcessingState({ company }) {
  return (
    <div className="processing-overlay">
      <div className="processing-content">
        <i className="fas fa-sync processing-icon"></i>
        <h2>{company?.name || 'Company Information'}</h2>
        <p className="lead mb-4">We're gathering detailed information about this company. This might take a few minutes.</p>
        <div className="loading-progress">
          <div className="loading-bar"></div>
        </div>
        <p className="text-muted">You can leave this page and come back later - we'll keep working on it!</p>
        <Link to="/" className="btn btn-outline-primary mt-3">
          <i className="fas fa-arrow-left me-2"></i>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

function CompanyProfilePage() {
  const { slug } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingState, setProcessingState] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`http://127.0.0.1:8000/companies/search/?url=${slug}`);
        const { status, company: data, message } = response.data;

        if (status === 'processing') {
          setProcessingState(true);
          setCompanyData({
            name: data.name,
            slug: data.slug,
            status: 'processing'
          });
          return;
        }

        setCompanyData({
          name: data.name,
          slug: data.slug,
          about: data.about || 'No description available yet.',
          location: data.address || 'Address not available',
          phones: data.phone_numbers || [],
          totalScore: data.score || 0,
          scoreFromVerifications: 2.0,
          scoreFromReviews: 2.8,
          contacts: data.contacts || [],
          socials: data.social_urls || [],
          verifications: {
            phone: true,
            address: true,
            employees: false
          },
          reviews: data.comments || []
        });
        setProcessingState(false);

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
      {processingState && <ProcessingState company={companyData} />}
      
      <div className="position-relative p-0">
        <Navbar />
        <ProfileHeader 
          companyName={companyData.name}
          totalScore={companyData.totalScore}
          verificationCount={
            Object.values(companyData.verifications).filter(Boolean).length
          }
          reviewCount={companyData.reviews.length}
        />
      </div>

      <ProfileBody 
        companyData={companyData}
        isProcessing={processingState}
      />

      <Footer />

      <a href="#" className="btn btn-lg btn-secondary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
}

export default CompanyProfilePage;