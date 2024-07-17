import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/style.css';

const Login = () => {
  return (
    <>
      <div className='login-main'>
        <Header />

        <div className='forms-section'>
          <h1>Fill up here!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
