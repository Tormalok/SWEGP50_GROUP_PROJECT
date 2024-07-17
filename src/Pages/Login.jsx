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
          <h1 className='title'>Sign in</h1>
          <form className='form-main'>
            <div>
              {/* <label htmlFor='email'>Email:</label> */}
              <input
                placeholder='Email'
                type='email'
                id='email'
                // value={email}
                // onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              {/* <label htmlFor='password'>Password:</label> */}
              <input
                placeholder='Password'
                type='password'
                id='password'
                // value={password}
                // onChange={handlePasswordChange}
                required
              />
            </div>
            {/* <button type='submit'>Sign In</button> */}
            <div className='btn'>Sign in</div>

            <div className='option'>
              <p>
                Don't have an account?
                <span> Sign up</span>
              </p>
            </div>
            <div className='btn-links'>Sign in with Google</div>
            <div className='btn-links'>Sign in with Microsoft</div>
            <div className='btn-links'>Sign in with Apple</div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
