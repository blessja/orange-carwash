import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Fetch the user's profile data and populate the form
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const { name, email, phone } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
      } catch (error) {
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('/api/users/profile', { name, email, phone });
      // Handle success
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
