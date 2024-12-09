import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import {Link, useNavigate} from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import Toggle from '../Toggle'
import Cookies from 'js-cookie'
import './index.css'
const Navbar = () => {
    const {toggle} = useContext(ToggleContext)
    const navigate = useNavigate()
    const onClickLogoutButton = () => {
        navigate('/login', {replace:true})
        Cookies.remove('jwt_token')
    }
    return(
        <div className={toggle ? 'dark-navbar-jobby-container' : 'navbar-jobby-container'}>
            <div>
                <Link to='/'>
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" className="navbar-jobby-logo"/>
                </Link>
                
            </div>
            <ul className='navbar-link-container'>
                <Link className='job-link' to='/'>
                <li className={toggle ? 'dark-navbar-link' : 'navbar-link' }>Home</li>   
                </Link>
                <Link className='job-link' to='/jobs'>
                <li className={toggle ? 'dark-navbar-link' : 'navbar-link' }>Jobs</li>   
                </Link>
                <Toggle />
            </ul>

            <ul className='small-navbar-link-container'>
                <Link className='job-link' to='/'>
                <li className={toggle ? 'dark-small-navbar-link':'small-navbar-link'}><AiFillHome /></li>   
                </Link>
                <Link className='job-link' to='/jobs'>
                <li className={toggle ? 'dark-small-navbar-link':'small-navbar-link'}><BsFillBriefcaseFill /></li>   
                </Link>
                <Toggle />
            </ul>


            <button onClick={onClickLogoutButton} className='logout-button'>Logout</button>
            <button onClick={onClickLogoutButton} className={toggle ? 'dark-small-logout-button' : 'small-logout-button' }><HiOutlineLogout /></button>
        </div>
    )
}

export default Navbar