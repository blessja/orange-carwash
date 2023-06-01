import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffLogin from './pages/StaffLogin';
import UserDashboard from './pages/UserDashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDetails from './components/UserDetails';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/staff/login' element={<StaffLogin />} />
            <Route path='/user/dashboard/' element={<UserDashboard />} />
            <Route path='/staff/dashboard' element={<StaffDashboard />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/users/edit/:id' element={<ProfileEdit />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
