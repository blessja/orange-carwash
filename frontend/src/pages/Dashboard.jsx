import { useEffect,  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import WashHistory from '../components/WashHistory'

function Dashboard() {
  const navigate = useNavigate()
  const [washDates, setWashDates] = useState([]);

  const handleWashCar = () => {
    if (washDates.length < 6) {
      const updatedWashDates = [...washDates, new Date().toLocaleDateString()];
      setWashDates(updatedWashDates);
    }
  };

  const { user } = useSelector((state) => state.auth)
  const { staff } = useSelector((state) => state.staff);
  

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (staff) {
      navigate('/');
    }
  }, [user, staff, navigate]);

 

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Enjoy the discounts</p>
      </section>

     

      <section className='content'>
      <WashHistory washDates={washDates} />
      <button onClick={handleWashCar} disabled={washDates.length >= 6}>
        Wash Car
      </button>
      </section>
    </>
  )
}

export default Dashboard
