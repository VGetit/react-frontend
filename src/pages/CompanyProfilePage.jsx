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

function ErrorState({ message }) {
  return (
    <div className="hero-header modern-hero pt-5" style={{height: '65vh'}}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="alert alert-danger" role="alert">
            <div className="text-center">
              <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
              <h4 className="alert-heading">Error Loading Company</h4>
              <p className="mb-4">{message}</p>
              <Link to="/" className="btn btn-outline-danger">
                <i className="fas fa-arrow-left me-2"></i>
                Return to Home
              </Link>
            </div>
          </div>
        </div>
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

  const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setProcessingState(false);

        const response = await axios.get(`http://127.0.0.1:8000/companies/get/?slug=${slug}`);
        const { status, company: data, message } = response.data;
        console.log('Response data:', response.data);

        if (status === 'processing') {
          setProcessingState(true);
          setCompanyData({
            name: data.name,
            slug: data.slug,
            status: 'processing'
          });
          setIsLoading(false);
          return;
        }
        if (status === 'error') {
          setError(message || 'Unable to find the company you\'re looking for. Please check the URL and try again.');
          setProcessingState(false);
          setIsLoading(false);
          return;
        }
        console.log('Fetched company data:', data);

        setCompanyData({
          name: data.name,
          slug: data.slug,
          about: data.about || 'No description available yet.',
          location: data.address || 'Address not available',
          phones: data.phone_numbers || [],
          totalScore: data.score || 0,
          contacts: data.contacts || [],
          socials: data.social_urls || [],
          verifications: data.verifications,
          reviews: data.comments || []
        });
        setProcessingState(false);

        } catch (err) {
          setError('Unable to find the company you\'re looking for. Please check the URL and try again.');
          setProcessingState(false);
          console.error(err);
        } finally {
          setIsLoading(false);
        }
  };

  useEffect(() => {
  if (slug) {
    fetchCompanyData();
  }

  }, [slug]);

  const handleRefreshData = () => {
    fetchCompanyData();
  };

  if (isLoading) {
    return (
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-0">
        <Navbar />
        <ErrorState message={error} />
        <Footer />
      </div>
    );
  }

  if (processingState) {
    return (
      <div className="bg-white p-0">
        <Navbar />
        <ProcessingState company={companyData} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white p-0">
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
        onRefresh={handleRefreshData}
      />

      <Footer />

      <a href="#" className="btn btn-lg btn-secondary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
}

export default CompanyProfilePage;