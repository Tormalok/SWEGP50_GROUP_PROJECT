import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import './styles/style.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // Step 1: email/password, Step 2: first/last name
  const [userId, setUserId] = useState(null); // Store user ID after initial sign up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    if (step === 1) {
      // Step 1: Email and password
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
          if (isSignUp) {
            setUserId(data._id); // Store user ID for the next step
            localStorage.setItem('token', data.token); // Store token in local storage
            setStep(2); // Move to the next step
            setEmail(''); // Clear email
            setPassword(''); // Clear password
          } else {
            if (data.token) {
              localStorage.setItem('token', data.token);
            }
            alert('Sign in successful!');
            window.location.href = '/profile';
          }
        } else {
          alert(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    } else {
      // Step 2: First name and last name
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const url = `/api/users/${userId}`;
      const method = 'PUT';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add token to headers
      };
      const body = JSON.stringify({ firstName, lastName });

      try {
        const response = await fetch(url, { method, headers, body });
        const data = await response.json();
        if (response.ok) {
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          alert('Sign up successful!');
          window.location.href = '/profile';
        } else {
          alert(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
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
            {step === 1 ? (
              <>
                <div>
                  <input
                    placeholder='Email*'
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label='Password'
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    placeholder='First Name*'
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-label='First Name'
                  />
                </div>
                <div>
                  <input
                    placeholder='Last Name*'
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-label='Last Name'
                  />
                </div>
              </>
            )}
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
