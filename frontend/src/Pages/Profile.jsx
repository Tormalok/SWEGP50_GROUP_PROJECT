import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    street: '123 Main St',
    city: 'Anytown',
    region: 'Anystate',
    postalCode: '12345',
    country: 'USA',
    phoneNumber: '123-456-7890',
    dateOfBirth: '1990-01-01',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className='profile-page-container'>
        <Header />
        <div className='profile-content'>
          <div className='profile-card'>
            <div className='profile-header'>
              <div className='profile-pic'>
                <AccountCircleIcon fontSize='inherit' />
              </div>
              <div className='profile-info'>
                <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                <p>{profile.email}</p>
              </div>
              <button className='profile-edit-button' onClick={handleEdit}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            <form className='profile-form'>
              <div className='profile-form-row'>
                <label className='profile-form-label'>
                  First Name:
                  <input
                    type='text'
                    name='firstName'
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
                <label className='profile-form-label'>
                  Last Name:
                  <input
                    type='text'
                    name='lastName'
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
              </div>
              <div className='profile-form-row'>
                <label className='profile-form-label'>
                  Street:
                  <input
                    type='text'
                    name='street'
                    value={profile.street}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
                <label className='profile-form-label'>
                  City:
                  <input
                    type='text'
                    name='city'
                    value={profile.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
              </div>
              <div className='profile-form-row'>
                <label className='profile-form-label'>
                  Region:
                  <input
                    type='text'
                    name='region'
                    value={profile.region}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
                <label className='profile-form-label'>
                  Postal Code:
                  <input
                    type='text'
                    name='postalCode'
                    value={profile.postalCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
              </div>
              <div className='profile-form-row'>
                <label className='profile-form-label'>
                  Country:
                  <input
                    type='text'
                    name='country'
                    value={profile.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
                <label className='profile-form-label'>
                  Phone Number:
                  <input
                    type='tel'
                    name='phoneNumber'
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
              </div>
              <div className='profile-form-row'>
                <label className='profile-form-label'>
                  Date of Birth:
                  <input
                    type='date'
                    name='dateOfBirth'
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='profile-form-input'
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
