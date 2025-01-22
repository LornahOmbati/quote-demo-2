import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Footer({ isLoggedIn }) {  // Receive login status as a prop
  return (
    <footer className="App-footer">
      <div className="footer-container">
        {/* Left Section - More Section (Additional Links) */}
        <div className="footer-section">
          <h4 className="footer-header">Explore Website:</h4>
          <ul className="footer-links">
            {/* Always visible links */}
            <li><Link to="/help" className="footer-link">Report bug</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/help" className="footer-link">Help</Link></li>

            {/* Conditional links for logged-in users */}
            {isLoggedIn && (
              <>
                <li><Link to="/home" className="footer-link">Home</Link></li>
                <li><Link to="/invoice" className="footer-link">Invoice</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Center Section - Contact Information */}
        <div className="footer-section">
          <h4 className="footer-header">Contact:</h4>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
              <a href="mailto:azeli@primegearafrica.com" className="footer-contact-link">companyxyz@example.com</a>
            </div>
            <div className="footer-contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
              <p className="footer-location">Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="footer-section">
          <div className="footer-social-media">
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-built-by">
          <p>
            Built by{" "}
            <a 
              href="https://lornaombati.netlify.app/"
              // href="https://www.linkedin.com/in/lorna-ombati-72619a222/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Lorna Ombati
            </a>
          </p>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p> Copyright &copy; Company xyz {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
