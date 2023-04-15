import React from 'react';
import logo from '../assets/icon-dark2.png';
import instagramIcon from '../assets/logo-instagram.png';
import youtubeIcon from '../assets/logo-youtube.png';
import facebookIcon from '../assets/logo-facebook.png';
import twitterIcon from '../assets/icon-twitter.png'
import twitchIcon from '../assets/icon-twitch2.png';
import linkdinIcon from '../assets/icon-linkdin.png'
import logoFooter from '../assets/logo-skypulse-footer.png';
import handleLogoClick from './Navbar';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="column">
          <h4>Sky Pulse</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
        <div className="column">
          <h4>Discover</h4>
          <a href="/interests">Interests</a>
          <a href="/enterprise">Enterprise</a>
          <a href="/community">Community</a>
        </div>
        <div className="column">
          <h4>Discover</h4>
          <a href="/safeflying">Safe Flying</a>
          <a href="/law">Drone Law</a>
          <a href="/cookies">Cookies</a>
        </div>
        <div className="column">
          <h4>Professionals</h4>
          <a href="/developer">Developer</a>
          <a href="/maps">Maps</a>
          <a href="/explore">Explore</a>
        </div>
      </div>
      
      <div className="footer-logos">
      <div className="social-icons">
          <a href="https://www.linkdin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkdinIcon} alt="Linkdin" />
          </a>
          <a href="https://www.twitch.com" target="_blank" rel="noopener noreferrer">
            <img src={twitchIcon} alt="Twitch" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
        </div>
        <img src={logoFooter} onClick={handleLogoClick}  alt="Logo" className="footer-logo" />
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
        <p>&copy; {new Date().getFullYear()} U&D™ | All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;
