import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [washHistory, setWashHistory] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If the user is not logged in, redirect them to the login page
      navigate.push('/login');
    } else {
      // Fetch user information and wash history from the server
      fetchUserData(user._id); // Assuming the user object has an _id property
    }
  }, [user, navigate]);

  
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await response.json();
  
      console.log('Response:', data);
  
      if (response.ok) {
        setUserInfo(data);
        setWashHistory(data.washHistory.length > 0 ? data.washHistory : []);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching user data.');
      console.log('Error:', error.message);
    }
  };
  
  

  
  
  
  
  

  return (
    <div>
      {console.log('userInfo:', userInfo)}
      {userInfo ? (
        <div>
          <h2>Welcome, {userInfo.name}!</h2>
          <p>Email: {userInfo.email}</p>
          <p>Phone: {userInfo.phone}</p>
  
          <h3>Wash History</h3>
          {console.log('washHistory:', washHistory)}
          {washHistory.length > 0 ? (
            <ul>
              {washHistory.map((wash) => (
                <li key={wash._id}>{wash.date}</li>
                // Render other wash history details here
              ))}
            </ul>
          ) : (
            <p>No wash history available.</p>
          )}
        </div>
      ) : (
        <p>{error ? error : 'Loading user information...'}</p>
      )}
    </div>
  );
  
}

export default UserDashboard;
