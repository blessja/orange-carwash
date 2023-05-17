import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { logoutStaff, resetStaff } from '../features/staff/staffSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { staff } = useSelector((state) => state.staff)

  const onLogout = () => {
    dispatch(logout())
    dispatch(logoutStaff())
    dispatch(reset())
    dispatch(resetStaff())
    navigate('/')
  }

  return (
    <header style={{background: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='header'>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px'}} className='logo'>
        <img style={{width: '100px', height: '100px'}} src={require('../images/android-chrome-192x192.png')} alt="" />
        <Link className='logo-text' to='/' style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'black', textDecoration: 'none'}}>Orange Car Wash </Link>
      </div>
      <ul>
        {user !== staff ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login Customer
              </Link>
            </li>
          </li>
          
          
        ) : (
          <>
            <li>
              <Link to='/staff/login'>
                <FaSignInAlt />
                Staff Login
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login Customer
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register Customer
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
