import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
import { FaUser } from 'react-icons/fa'
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    number_plate: '',
    phone: '',
    password: '',
    password2: '',
  });

  const {  number_plate, phone, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
        number_plate,
      phone,
      password,
    };

    dispatch(register(userData))
      .then(() => {
        navigate('/staff/dashboard');
      })
      .catch((error) => {
        toast.error('Registration failed. Please try again.');
      });
  };

  return (
    <div>
        <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <input
              type='number_plate'
              className='form-control'
              id='number_plate'
              name='number_plate'
              value={number_plate}
              placeholder='Customer number plate'
              onChange={handleChange}
              autoComplete='on'
            />
          </div>
       <div className='form-group'>
            <input
              type='phone'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Enter your phone number'
              onChange={handleChange}
              autoComplete='on'
            />
          </div>
         <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={handleChange}
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={handleChange}
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
      </form>
      </section>
      
    </div>
  );
};

export default RegistrationForm;