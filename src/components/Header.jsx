import React from 'react';
import { Link } from 'react-router-dom';
import './styles/style.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <span className='logo-ink'>ARC</span>VAN
        </Link>
      </div>
      <div className='nav'>
        <ul className='nav-links'>
          <li className='nav-link'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-link'>
            <Link to='/login'>Login</Link>
          </li>
          <li className='nav-link'>
            <Link to='/products'>Products</Link>
          </li>
          <li className='nav-link'>
            <Link to='/about'>About</Link>
          </li>
          <li className='nav-link'>
            <Link to='/cart'>Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
