import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import Navbar from '../Navbar'

const NotFound = () => {
    const {toggle} = useContext(ToggleContext)
    return(
    <div className={toggle?'white-not-found-bg-container':'not-found-bg-container'}>
        <Navbar />
        <div>
            <img 
            src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png' 
            alt='not found' className='not-found-img-style' 
            />
        </div>
        <h1 className='not-found-heading'>Page Not Found</h1>
        <p className={toggle?'whilte-not-found-msg':'not-found-msg'}>We are sorry, the page you requested could not be found.</p>
    </div>

)}

export default NotFound