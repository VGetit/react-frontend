// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <div className="container-fluid footer footer-modern mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-4 px-lg-5">
        <div className="d-flex justify-content-center mb-4">
          <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
          <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
          <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
          <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
        </div>
        <div className="copyright">
          <div className="row">
            <div className="col-12 text-center">
              {/* Yılı dinamik olarak alıyoruz */}
              <p className="text-white mb-0">&copy; <a className="border-bottom" href="#">VGetit</a>, All Right Reserved. {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;