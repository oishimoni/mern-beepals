import React, { useState, useEffect } from 'react';
import api from '../utils/axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in header
          },
        });
        setProfile(response.data);
        setName(response.data.name || '');
        setBio(response.data.bio || '');
        setLocation(response.data.location || '');
        setAge(response.data.age || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await api.put(
        '/profile/update',
        { name, bio, location, age },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in header
          },
        }
      );
      setMessage(response.data.message);
      setProfile(response.data.updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete('/profile/delete', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in header
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setMessage('Failed to delete account');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <button type="button" onClick={handleUpdate}>Update Profile</button>
        <button type="button" onClick={handleDelete}>Delete Account</button>
      </form>
    </div>
  );
};

export default Profile;