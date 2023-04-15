import React from 'react';
import logo from '../assets/icon-dark2.png';
import instagramIcon from '../assets/logo-instagram.png';
import youtubeIcon from '../assets/logo-youtube.png';
import facebookIcon from '../assets/logo-facebook.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="column">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
        <div className="column">
          <a href="/interests">Interests</a>
          <a href="/enterprise">Enterprise</a>
          <a href="/community">Community</a>
        </div>
        <div className="column">
          <a href="/safeflying">Safe Flying</a>
          <a href="/developer">Developer</a>
          <a href="/cookies">Use of Cookies</a>
        </div>
        <div className="column">
          <a href="/law">Law</a>
          <a href="/maps">Maps</a>
          <a href="/explore">Explore</a>
        </div>
      </div>
      <div className="footer-logos">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
        </div>
      </div>
      <hr className="divider" />
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} U&D™ | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
