// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { customSlugify, formatUrl } from '../utils/slugify';

function HeroSection() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) {
      setSearchStatus({
        type: 'error',
        message: 'Please enter a website URL.'
      });
      return;
    }

    setIsSearching(true);
    setSearchStatus(null);

    try {
      const formattedUrl = formatUrl(query);
      const companySlug = customSlugify(formattedUrl);
      const response = await axios.get(`http://127.0.0.1:8000/companies/search/?url=${formattedUrl}`);
      
      const { status, company, message } = response.data;

      if (status === 'success') {
        // Company exists and is processed
        navigate(`/company/${company.slug}`);
      } else if (status === 'processing') {
        // Company is being scraped
        setSearchStatus({
          type: 'processing',
          message: message || 'Gathering company information. This may take a few minutes.',
          company: company
        });
        // Optionally navigate to a loading page
        navigate(`/company/${companySlug}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          'An error occurred while searching. Please try again.';
      
      setSearchStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-primary hero-header modern-hero fullscreen-hero">
      <div className="container px-lg-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <h1 className="display-3 text-white mb-4 animated slideInDown fw-bold">Empower Your Decisions</h1>
            <p className="text-white animated slideInUp mb-5 fs-5" style={{ opacity: 0.9 }}>
              Find the best among thousands of companies and take the right step with real reviews.
            </p>
            <div className="search-bar-wrapper position-relative mx-auto wow fadeInUp" data-wow-delay="0.3s" style={{ maxWidth: '600px' }}>
              <i className="fa-solid fa-globe search-icon"></i>
              <input
                className="form-control"
                type="text"
                placeholder="Enter company website... (e.g., example.com)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                disabled={isSearching}
              />
              <button 
                onClick={handleSearch} 
                className="btn btn-secondary py-2 px-4 position-absolute"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            
            {searchStatus && (
              <div className={`mt-4 alert ${searchStatus.type === 'error' ? 'alert-danger' : 'alert-info'}`}>
                <p className="mb-0">{searchStatus.message}</p>
                {searchStatus.type === 'processing' && searchStatus.company && (
                  <div className="mt-2">
                    <strong>{searchStatus.company.name}</strong>
                    <p className="mb-0 small">We'll notify you once the information is ready.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;