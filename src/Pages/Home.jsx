import React from 'react';
import './styles/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <div className='homepage-main'>
        <Header />
        <h1>Home Page</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
