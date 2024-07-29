import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/style.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form values
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Determine the URL and request options based on the form type
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
        // Optionally, handle successful login/signup, e.g., redirect to another page
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
