import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/style.css';

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
      <div className='homepage-container'>
        <Header />
        <div className='prod-container'>
          <div className='profile-container'>
            <h2
              style={{ fontSize: '2.3rem' }}
            >{`${profile.firstName}'s Profile`}</h2>
            <form>
              <label>
                Email:
                <input
                  type='email'
                  name='email'
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                First Name:
                <input
                  type='text'
                  name='firstName'
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Last Name:
                <input
                  type='text'
                  name='lastName'
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Street:
                <input
                  type='text'
                  name='street'
                  value={profile.street}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                City:
                <input
                  type='text'
                  name='city'
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Region:
                <input
                  type='text'
                  name='region'
                  value={profile.region}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Postal Code:
                <input
                  type='text'
                  name='postalCode'
                  value={profile.postalCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Country:
                <input
                  type='text'
                  name='country'
                  value={profile.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type='tel'
                  name='phoneNumber'
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Date of Birth:
                <input
                  type='date'
                  name='dateOfBirth'
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </label>
              <button type='button' onClick={handleEdit}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
