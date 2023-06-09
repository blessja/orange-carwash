import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, resetStaff } from '../features/staff/staffSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  })

  const { phone, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { staff, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.staff
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || staff) {
      navigate('/staff/dashboard')
    }

    dispatch(resetStaff())
  }, [staff, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const staffData = {
      phone,
      password,
    }

    dispatch(login(staffData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1 style={{fontSize: "23px", fontWeight: "600", paddingTop: "20px"}} className='login-title'>
        LOG IN
        </h1>
       
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='phone'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Cell Number'
              onChange={onChange}
              autoComplete='yes'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
              autoComplete='yes'
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
                LOG IN
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login