import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { logoutStaff, resetStaff } from '../features/staff/staffSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { staff } = useSelector((state) => state.staff);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(logoutStaff());
    dispatch(reset());
    dispatch(resetStaff());
    navigate('/');
  };

  return (
    <header
      style={{ background: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
      className='header'
    >
      
        <img style={{ width: '100px', height: '100px', }} src={require('../images/WhatsApp Image 2023-05-17 at 12.22.35.jpg')} alt='' />
        <h1 className='carwash-h'> CAR WASH NAME</h1>
      

      {/* Hamburger menu */}
      <IconContext.Provider value={{ color: '#4682B4' }}>
        <div className='mobile-menu'>
          <FaBars onClick={toggleMobileMenu} />
          <input type="checkbox" id="mobile-menu-checkbox" ref={mobileMenuRef} style={{ display: 'none' }} />
          {isMobileMenuOpen && (
            <ul className='mobile-menu-items'>
              {user !== staff ? (
                <li onClick={closeMobileMenu}>
                  <button className='btn' onClick={onLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li onClick={closeMobileMenu}>
                    <Link to='/staff/login'>
                      Carwash Login
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to='/login'>
                      Customer Login
                    </Link>
                  </li>
                  {/* <li onClick={closeMobileMenu}>
                    <Link to='/register'>
                      <FaUser /> Register Customer
                    </Link>
                  </li> */}
                </>
              )}
            </ul>
          )}
        </div>
      </IconContext.Provider>
    </header>
  );
}

export default Header;



// import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
// import { IconContext } from "react-icons";
// import { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, reset } from '../features/auth/authSlice';
// import { logoutStaff, resetStaff } from '../features/staff/staffSlice';

// function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { staff } = useSelector((state) => state.staff);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const mobileMenuRef = useRef(null);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const onLogout = () => {
//     dispatch(logout());
//     dispatch(logoutStaff());
//     dispatch(reset());
//     dispatch(resetStaff());
//     navigate('/');
//   };

//   return (
//     <header
//       style={{ background: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//       className='header'
//     >
//       <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className='logo'>
//         <img style={{ width: '100px', height: '100px' }} src={require('../images/WhatsApp Image 2023-05-17 at 12.22.35.jpg')} alt='' />
//         <Link className='logo-text' to='/' style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4682B4', textDecoration: 'none' }}>
//           Orange Car Wash
//         </Link>
//       </div>

//       {/* Hamburger menu */}
//       <IconContext.Provider value={{ color: '#4682B4' }}>
//         <div className='mobile-menu'>
//           <FaBars onClick={toggleMobileMenu} />
//           <input type="checkbox" id="mobile-menu-checkbox" ref={mobileMenuRef} style={{ display: 'none' }} />
//           {isMobileMenuOpen && (
//             <ul className='mobile-menu-items'>
//               {user !== staff ? (
//                 <li onClick={closeMobileMenu}>
//                   <button className='btn' onClick={onLogout}>
//                     Logout
//                   </button>
//                 </li>
//               ) : (
//                 <>
//                   <li onClick={closeMobileMenu}>
//                     <Link to='/staff/login'>
//                       Carwash Login
//                     </Link>
//                   </li>
//                   <li onClick={closeMobileMenu}>
//                     <Link to='/login'>
//                       Customer Login
//                     </Link>
//                   </li>
//                   {/* <li onClick={closeMobileMenu}>
//                     <Link to='/register'>
//                       <FaUser /> Register Customer
//                     </Link>
//                   </li> */}
//                 </>
//               )}
//             </ul>
//           )}
//         </div>
//       </IconContext.Provider>
//     </header>
//   );
// }

// export default Header;
