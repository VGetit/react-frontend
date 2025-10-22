// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a website.");
      return;
    }

    console.log(`Aranan URL: ${query}`);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/companies/search/?url=${query}`);
      const slug = response.data.company.url;
      console.log(response.data);
      if (slug) {
        navigate(`/company/${slug}`);
      }
    } catch (error) {
      console.error("Error during search!", error);
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
              <i className="fa fa-search search-icon"></i>
              <input
                className="form-control"
                type="text"
                placeholder="Şirket adı veya web sitesi arayın..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="btn btn-secondary py-2 px-4 position-absolute">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;