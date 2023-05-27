// UserDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleWashCar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/wash`, {
        method: 'POST',
      });
      const data = await response.json();
      setUser(data);
      console.log('Wash history updated');
    } catch (error) {
      console.error('Error washing car:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Car: {user.car}</p>
      <button onClick={handleWashCar}>Wash Car</button>
    </div>
  );
};

export default UserDetails;
