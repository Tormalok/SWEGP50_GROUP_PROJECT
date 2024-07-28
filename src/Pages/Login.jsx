import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/style.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <div className='login-container'>
        <Header />

        <div className='form-section'>
          <h1 className='title'>{isSignUp ? 'Sign up' : 'Sign in'}</h1>
          <form className='form-main'>
            <div>
              <input placeholder='Email*' type='email' id='email' required />
            </div>
            <div>
              <input
                placeholder='Password*'
                type='password'
                id='password'
                required
              />
            </div>
            <button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>

            <div className='option'>
              <p>
                {isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}
                <span onClick={toggleSignUp} className='toggle-link'>
                  {isSignUp ? ' Sign in' : ' Sign up'}
                </span>
              </p>
            </div>
            <a href='#' className='btn-links'>
              <img src='\form_logos\google.svg' alt='Google logo' />
              <p>Continue with Google</p>
            </a>
            <a href='#' className='btn-links'>
              <img src='\form_logos\microsoft.svg' alt='Microsoft logo' />
              <p>Continue with Microsoft Account</p>
            </a>
            <a href='#' className='btn-links'>
              <img src='\form_logos\apple.svg' alt='Apple logo' />
              <p>Continue with Apple</p>
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
