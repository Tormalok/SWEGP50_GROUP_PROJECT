import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Error fetching profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          alert('Profile updated successfully!');
        } else {
          console.error('Error updating profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
              {isEditing && (
                <button
                  type='button'
                  onClick={handleEdit}
                  className='profile-save-button'
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
