import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>ABOUT</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Flipkart Stories</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Corporate Information</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>HELP</h4>
          <ul>
            <li><a href="#">Payments</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Cancellation & Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>POLICY</h4>
          <ul>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SOCIAL</h4>
          <ul>
            <li><a href="#">🐦 Twitter</a></li>
            <li><a href="#">📘 Facebook</a></li>
            <li><a href="#">📸 Instagram</a></li>
            <li><a href="#">▶️ YouTube</a></li>
          </ul>
        </div>
        <div className="footer-col footer-mail-us">
          <h4>MAIL US</h4>
          <p>Flipkart Internet Private Limited,<br />Buildings Alyssa, Begonia &<br />Clove Embassy Tech Village,<br />Outer Ring Road, Devarabeesanahalli Village,<br />Bengaluru, 560103,<br />Karnataka, India</p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-bottom-inner">
        <div className="footer-bottom-links">
          <span>🛡️ Become a Seller</span>
          <span>🎁 Advertise</span>
          <span>🎯 Gift Cards</span>
          <span>❓ Help Center</span>
        </div>
        <div className="footer-copyright">
          © 2024 Flipkart Clone. Built for SDE Assignment.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
