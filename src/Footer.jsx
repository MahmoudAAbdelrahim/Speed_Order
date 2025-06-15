// Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp, FaGoogle } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h5>Company</h5>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Work With Us</a></li>
            <li><a href="#develop">Develop With Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Account</h5>
          <ul>
            <li><a href="/SignUp">Create Account</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Profile">Your Profile</a></li>
            <li><a href="#browse">Browse</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="#FaFacebooF"><FaFacebookF /></a>
            <a href="#FaFacebokF"><FaInstagram /></a>
            <a href="#FaFacebookF"><FaTelegramPlane /></a>
            <a href="#FaFaceookF"><FaWhatsapp /></a>
            <a href="#FaFaceokF"><FaGoogle /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p> <span className="logo-text">Speed <small>order</small></span>© 2025. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
