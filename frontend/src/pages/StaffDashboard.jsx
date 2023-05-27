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
    <div>
      <h2>Staff Dashboard</h2>
      {users.map((user) => (
        <Link key={user._id} to={`/users/${user._id}`}>
          <UserCard user={user} />
        </Link>
      ))}
    </div>
  );
};

export default StaffDashboard;





// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getUsers, selectUsers } from '../features/auth/authSlice';

// const StaffDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const users = useSelector(selectUsers);

//   useEffect(() => {
//     // Fetch the list of users when the component mounts
//     dispatch(getUsers());
//   }, [dispatch]);

//   const handleUserClick = (userId) => {
//     // Navigate to the user details page when a user is clicked
//     navigate(`/users/${userId}`);
//   };

//   return (
//     <div>
//       <h1>Staff Dashboard</h1>
//       <h2>Users</h2>
//       {users.map((user) => (
//         <div key={user.id} onClick={() => handleUserClick(user.id)}>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Phone: {user.phone}</p>
//           {/* Add more user details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StaffDashboard;
