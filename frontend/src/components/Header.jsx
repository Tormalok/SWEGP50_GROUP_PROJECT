import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';
import Account from './Account';
import Cart from './Cart';
import './styles/style.css';

const Header = () => {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const pathsWithoutNav = ['/login', '/signup', '/profile'];
    if (pathsWithoutNav.includes(location.pathname)) {
      setShowNav(false);
    } else {
      setShowNav(window.scrollY <= 70);
    }
  }, [location.pathname]);

  return (
    <>
      <div className={`header ${showNav ? '' : 'shadow'}`}>
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
      {showNav &&
        location.pathname !== '/login' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/profile' && (
          <nav className={`nav-bar ${showNav ? '' : 'hidden'}`}>
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
        )}
    </>
  );
};

export default Header;
