import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // Fetch existing profile when page loads
    const fetchProfile = async () => {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token
        },
      });
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    await axios.put('http://localhost:5000/api/profile/update', 
    { name, bio, location, age }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token
      },
    });
    // Handle success
  };

  const handleDelete = async () => {
    await axios.delete('http://localhost:5000/api/profile/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token
      },
    });
    // Redirect after deletion
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        type="text"
        value={name || profile.name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={bio || profile.bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <input
        type="text"
        value={location || profile.location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="number"
        value={age || profile.age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default Profile;
