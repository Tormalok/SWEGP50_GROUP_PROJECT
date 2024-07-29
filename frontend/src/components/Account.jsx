import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './styles/style.css';

const Account = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='account-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AccountCircleIcon />
      <span>Account</span>
      <ArrowDropDownIcon
        className={`arrow-icon ${isHovered ? 'visible' : ''}`}
      />
    </div>
  );
};

export default Account;
