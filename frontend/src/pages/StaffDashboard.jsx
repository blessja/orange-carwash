import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const StaffDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#FDEDD0' }}>
      <button
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: 'orange',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px',
          textDecoration: 'none',
          marginBottom: '20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Link to='/register-customer' style={{ color: 'white', textDecoration: 'none' }}>
          Register Customer
        </Link>
      </button>
      <h2 style={{ marginBottom: '20px' }}>Staff Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{ width: '300px', background: 'white', padding: '20px', borderRadius: '8px' }}
          >
            <Link to={`/users/${user._id}`}>
              <UserCard user={user} />
            </Link>
            {/* <p>Email: {user.email}</p> */}
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
