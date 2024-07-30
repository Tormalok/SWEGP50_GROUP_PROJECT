import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import Account from './Account';
import Cart from './Cart';
import './styles/style.css';

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='left-group'>
          <div className='logo'>
            <Link to='/'>
              <span className='logo-ink'>ARC</span>VAN
            </Link>
          </div>
          <SearchBox />
        </div>
        <div className='right-group'>
          <Account />
          <Cart />
        </div>
      </div>
      <nav className='nav-bar'>
        <ul className='nav-links'>
          <li>
            <Link to='/categories'>Categories</Link>
          </li>
          <li>
            <Link to='/brands'>Brands</Link>
          </li>
          <li>
            <Link to='/services'>Services</Link>
          </li>
          <li>
            <Link to='/deals'>Deals</Link>
          </li>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
