// src/pages/HomePage.jsx
import React from 'react';

// Make sure your import paths are correct
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecentCompanies from '../components/RecentCompanies';
import Footer from '../components/Footer';

function HomePage() {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    // Use a Fragment (<>) to wrap everything into a single element
    <> 
      {/* SPINNER: Now this comment is correctly placed inside the single root element.
        {isLoading && (
          <div id="spinner" className="show bg-white position-fixed ...">
            ...
          </div>
        )}
      */}

      <div className="bg-white p-0">
        <div className="position-relative p-0">
          <Navbar />
          <HeroSection />
        </div>
        <RecentCompanies />
        <Footer />
        <a href="#" className="btn btn-lg btn-secondary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
    </>
  );
}

export default HomePage;