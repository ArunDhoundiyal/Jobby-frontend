import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom' 
import './index.css'
const Home = ({callFetchAllData}) => {
    const {toggle} = useContext(ToggleContext)
    const navigate = useNavigate()
    if (Cookies.get('jwt_token') === undefined){
        return <Navigate to='/login' />
    }
    return(
        <div className='home-jobby-bg-container' >
            <Navbar/>
            <div className='home-card-container'>
            <h1 className='home-jobby-heading'>Find The Job That Fits Your Life</h1>
            <p className='home-jobby-paragraph'>Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</p>
            <button type='button' className='find-jobs-button' onClick={()=>{navigate('/jobs')}}>Find Jobs</button>
        </div>
        </div>

    )
}
export default Home 