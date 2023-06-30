import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const StaffDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <div className="hd">
        <h2 style={{color: '#4682B4', paddingBottom: '20px'}}>DASHBOARD</h2>
      </div>
      <div className="reg-btn">
        <button
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4682B4',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '25px',
            textDecoration: 'none',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Link to='/register-customer' style={{ color: 'white', textDecoration: 'none' }}>
            Register New Customer
          </Link>
        </button>
      </div>
      <div style={{ padding: '20px', background: '#DBE2ED', opacity: '1' }}>

        <h4 style={{ marginBottom: '20px', color: '#4682B4' }}>REGISTERED CUSTOMERS</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginRight: 'auto', marginLeft: '40px', opacity: '0.7' }}>
          {users.map((user) => (
            <div className="user-card"
              key={user._id}
              style={{ width: '300px', background: '#4682B4', padding: '20px', borderRadius: '8px', }}
            >
              <Link to={`/users/${user._id}`}>
                <UserCard user={user} />
              </Link>
              
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default StaffDashboard;
