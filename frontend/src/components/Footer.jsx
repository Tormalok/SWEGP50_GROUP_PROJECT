import React from 'react';
import './styles/style.css';

const Footer = () => {
  return (
    <div className='footer-main'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h4>Contact Us</h4>
          <p>Email: samuelarcvan2020@gmail.com </p>
          <p>Phone: +233 505-629-322, +233 596-011-485</p>
          <p>Address: 123 Example Street, City, Country</p>
        </div>
        <div className='footer-section'>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href='/faq'>FAQ</a>
            </li>
            <li>
              <a href='/help'>Help Center</a>
            </li>
            <li>
              <a href='/returns'>Returns</a>
            </li>
            <li>
              <a href='/shipping'>Shipping Information</a>
            </li>
            <li>
              <a href='/order-tracking'>Order Tracking</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4>About Us</h4>
          <ul>
            <li>
              <a href='/about'>About Us</a>
            </li>
            <li>
              <a href='/careers'>Careers</a>
            </li>
            <li>
              <a href='/press'>Press</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4>Policies</h4>
          <ul>
            <li>
              <a href='/privacy'>Privacy Policy</a>
            </li>
            <li>
              <a href='/terms'>Terms of Service</a>
            </li>
            <li>
              <a href='/return-policy'>Return Policy</a>
            </li>
            <li>
              <a href='/shipping-policy'>Shipping Policy</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href='https://facebook.com/example'>Facebook</a>
            </li>
            <li>
              <a href='https://twitter.com/example'>Twitter</a>
            </li>
            <li>
              <a href='https://instagram.com/example'>Instagram</a>
            </li>
            <li>
              <a href='https://linkedin.com/company/example'>LinkedIn</a>
            </li>
            <li>
              <a href='https://pinterest.com/example'>Pinterest</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4>Subscribe to our Newsletter</h4>
          <form className='subscribe-form'>
            <input
              type='email'
              placeholder='Enter your email'
              className='subscribe-input'
            />
            <button type='submit' className='subscribe-button'>
              Subscribe
            </button>
          </form>
        </div>
        <div className='footer-section'>
          <h4>We Accept</h4>
          <img src='/images/payment-icons.png' alt='Accepted Payment Methods' />
        </div>
      </div>
      <div className='footer-legal'>
        <p>&copy; 2024 Arcvan Enterprise. All Rights Reserved.</p>
        <p>Trademark Information</p>
      </div>
    </div>
  );
};

export default Footer;
