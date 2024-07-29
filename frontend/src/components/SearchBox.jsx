import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './styles/style.css';

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleIconClick = () => {
    console.log('Search value: ', inputValue);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <div className='search-box'>
      <input
        type='text'
        placeholder='What can we help you find today?'
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchIcon
        className={`search-icon ${isClicked ? 'clicked' : ''}`}
        onClick={handleIconClick}
      />
    </div>
  );
};

export default SearchBox;
