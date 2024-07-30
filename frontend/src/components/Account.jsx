import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './styles/style.css';

const Account = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accountRef = useRef(null);

  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (accountRef.current && !accountRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={accountRef}
      className='account-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAccountClick}
    >
      <AccountCircleIcon />
      <span>Account</span>
      <ArrowDropDownIcon
        className={`arrow-icon ${isHovered ? 'visible' : ''}`}
      />
      {isDropdownOpen && (
        <div className='account-dropdown'>
          <Link to='/profile'>Profile</Link>
          <Link to='/login'>Sign In</Link>
          <Link to='/login?signup=true'>Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Account;
