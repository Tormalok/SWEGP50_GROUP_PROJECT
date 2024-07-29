import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import './styles/style.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('signup')) {
      setIsSignUp(true);
    }
  }, [location]);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const url = isSignUp ? '/api/users' : '/api/users/login';
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ email, password });

    try {
      const response = await fetch(url, { method, headers, body });
      const data = await response.json();
      if (response.ok) {
        alert(
          data.message ||
            (isSignUp ? 'Sign up successful!' : 'Sign in successful!')
        );
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <>
      <div className='login-container'>
        <Header />
        <div className='form-section'>
          <h1 className='title'>
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <form className='form-main' onSubmit={handleSubmit}>
            <div>
              <input
                placeholder='Email*'
                type='email'
                id='email'
                name='email'
                required
                aria-label='Email address'
              />
            </div>
            <div>
              <input
                placeholder='Password*'
                type='password'
                id='password'
                name='password'
                required
                aria-label='Password'
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
              <img src='/form_logos/google.svg' alt='Google logo' />
              <p>Continue with Google</p>
            </a>
            <a href='#' className='btn-links'>
              <img src='/form_logos/microsoft.svg' alt='Microsoft logo' />
              <p>Continue with Microsoft Account</p>
            </a>
            <a href='#' className='btn-links'>
              <img src='/form_logos/apple.svg' alt='Apple logo' />
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
