import React from 'react';
import './styles/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <div className='homepage-container'>
        <Header />
        <div className='prod-container'></div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
