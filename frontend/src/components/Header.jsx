import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import './styles/style.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <span className='logo-ink'>ARC</span>VAN
        </Link>
      </div>
      <SearchBox />
    </div>
  );
};

export default Header;
