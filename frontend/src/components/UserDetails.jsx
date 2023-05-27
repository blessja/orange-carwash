import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  console.log('user', user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await response.json();
        console.log('data', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

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
      {/* Display additional user details as needed */}
    </div>
  );
};

export default UserDetails;






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const UserDetails = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   console.log(userId);
//   console.log(user);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${userId}`);
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Details</h2>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Phone: {user.phone}</p>
//       <p>Wash Status: {user.washStatus}</p>
//     </div>
//   );
// };

// export default UserDetails;
