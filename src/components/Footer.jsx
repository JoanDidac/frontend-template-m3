import React from 'react';
// import logo from '../assets/icon-dark2.png';
import instagramIcon from '../assets/logo-instagram.png';
import youtubeIcon from '../assets/logo-youtube.png';
import facebookIcon from '../assets/logo-facebook.png';
import twitterIcon from '../assets/icon-twitter.png'
import twitchIcon from '../assets/icon-twitch2.png';
import linkdinIcon from '../assets/icon-linkdin.png'
import logoFooter from '../assets/logo-skypulse-footer-removebg-preview.png';
import handleLogoClick from './Navbar';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="column">
          <h4>Sky Pulse</h4>
          <a href="https://github.com/JoanDidac">About</a>
          <a href="https://cdn.memegenerator.es/imagenes/memes/full/28/30/28309208.jpg">Contact</a>
          <a href="https://images7.memedroid.com/images/UPLOADED546/6400d6d79e07c.webp">Support</a>
        </div>
        <div className="column">
          <h4>Discover</h4>
          <a href="https://abzinnovation.com/?gclid=CjwKCAjw__ihBhADEiwAXEazJuZ3lRaza8HaCF2B9_jDSQI2sOfPeJ63mMaeDJFrWq4I0eDIhXD0XhoCf4MQAvD_BwE">Agriculture</a>
          <a href="https://www.gsma.com/foundry/resources/project-spotlight-at-mwc-barcelona-2023-5g-enabling-enterprise-drones-to-fly-beyond-visual-line-of-sight/">Enterprise</a>
          <a href="https://diydrones.com/">Community</a>
        </div>
        <div className="column">
          <h4>Legislation</h4>
          <a href="https://www.oneair.es/normativa-drones-espana-aesa/">Safe Flying</a>
          <a href="https://www.boe.es/doue/2019/152/L00045-00071.pdf">Drone Law</a>
          <a href="https://images7.memedroid.com/images/UPLOADED430/636a71b802a95.webp">Cookies</a>
        </div>
        <div className="column">
          <h4>Professionals</h4>
          <a href="https://www.flytnow.com/drone-api">Developer</a>
          <a href="https://drones.enaire.es/">Maps Spain</a>
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
        <img  src={logoFooter} onClick={handleLogoClick}  alt="Logo" className="footer-logo" />
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
