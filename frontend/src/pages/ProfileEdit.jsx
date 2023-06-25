import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function UserProfileUpdate() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://orangecarwash.herokuapp.com/api/users/${user._id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          address,
          city,
          email,
        }),
      });

      if (response.ok) {
        // Profile update successful
        navigate(`/user/dashboard/${user._id}`); // Redirect back to the dashboard after successful update
      } else {
        // Handle the error response
        const errorData = await response.json();
        console.log('Error:', errorData.message);
        // Display or handle the error as needed
      }
    } catch (error) {
      // Handle the error
      console.log('Error:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <TextField
              label="Address"
              value={address}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <TextField
              label="City"
              value={city}
              onChange={handleCityChange}
              fullWidth
              required
            />
          </div>
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default UserProfileUpdate;
