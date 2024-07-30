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

  const hideSearchBoxPaths = ['/login', '/signup', '/profile'];

  const showShadow =
    !showNav || ['/login', '/signup', '/profile'].includes(location.pathname);

  return (
    <>
      <div className={`header ${showShadow ? 'shadow' : ''}`}>
        <div className='left-group'>
          <div className='logo'>
            <Link to='/'>
              <span className='logo-ink'>ARC</span>VAN
            </Link>
          </div>
          {!hideSearchBoxPaths.includes(location.pathname) && <SearchBox />}
        </div>
        <div className='right-group'>
          <Account />
          <Cart />
        </div>
      </div>
      {showNav && !hideSearchBoxPaths.includes(location.pathname) && (
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
      )}
    </>
  );
};

export default Header;
