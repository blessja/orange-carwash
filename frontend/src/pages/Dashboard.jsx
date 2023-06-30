import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { ListItemText } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

function Dashboard() {
  const navigate = useNavigate()




  const { user } = useSelector((state) => state.auth)
  const { staff } = useSelector((state) => state.staff);


  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (!staff) {
      navigate('/');
    }
  }, [user, staff, navigate]);



  return (
    <>
      <section className='heading'>
        <h2>DISCOUNTS AWAIT</h2>
        <p>Wash 5 times and get 1 wash FREE!</p>
        <button
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4682B4 0% 0% no-repeat padding-box ',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '15px',
            textDecoration: 'none',
            marginTop: '20px',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer',
            opacity: '1',
          }}
        > GET STARTED
          {/* <Link to='/register-customer' style={{ color: 'white', textDecoration: 'none' }}>
          Register Customer
        </Link> */}
        </button>

      </section>
      <section>
        <div className="price-list">
          <h5 className='price-list-heading'>PRICE LIST</h5>
          <div className="type-1">
          <p style={{ color: '#4682B4', fontWeight: 'bold' }}>Car/Bakkie </p>&emsp;&emsp;
          <p style={{ wordWrap: 'break-word',color: '#4682B4', fontWeight: 'bold'   }}>Minibus/4x4/ <br /> Double Cab </p>
          </div>
        
          <ListItem className='list-items'>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <ListItemText primary="Wash & Go" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R xxx" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R xxx" align="right" />
              </Grid>


              <Grid item xs={4}>
                <ListItemText primary="Wash & Dry" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R xxx" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R xxx" align="right" />
              </Grid>
            </Grid>
          </ListItem>

        </div>
      </section>



    </>
  )
}

export default Dashboard
