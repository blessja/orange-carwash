import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [washHistory, setWashHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the drawer
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

      // console.log('Response:', data);

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

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" style={{ marginLeft: '8px' }}>
          Profile Info
        </Typography>
      </div>
      {/* Drawer component */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* Drawer content */}
        <div style={{ width: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

      {userInfo ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome, {userInfo.name || userInfo.phone}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {userInfo.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Phone: {userInfo.phone}
          </Typography>
          

          <Typography variant="h5" gutterBottom>
            Wash History
          </Typography>
          {washHistory.length > 0 ? (
            <List>
              {washHistory.map((wash) => (
                <ListItem key={wash._id}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <ListItemText primary={formatDate(wash.date)} />
                    </Grid>
                    <Grid item xs={4}>
                      <LinearProgress variant="determinate" value={100} />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary="Completed" align="right" />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No wash history available.</Typography>
          )}
          <Link to="/update-profile">Update Profile</Link>
        </div>
      ) : (
        <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
      )}
    </Container>
  );
}

export default UserDashboard;
