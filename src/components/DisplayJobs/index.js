import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import {useNavigate} from 'react-router-dom'
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";


const DispalyJobs = ({eachJob}) => {
    const {toggle} = useContext(ToggleContext)
    const {companyLogoUrl, 
        employementType, 
        jobDescription, 
        location, 
        packagePerAnnum, 
        rating, 
        title,
        id} = eachJob

    const navigate = useNavigate()


    const onClickNavigate = () => {
        navigate(`/job-detail/${id}`)}



    return(
        <li className={toggle ? 'dark-display-job-container' : "display-job-container"}>
            <div className='company-logo-job-role-container' onClick={onClickNavigate}>
                <img className='company-logo' alt='company-logo' src={companyLogoUrl}/>
                <div>
                    <h1 className={toggle ? 'dark-job-title' : 'job-title'}>{title}</h1>
                    <div className='job-rating-title-container'>
                    <MdOutlineStarPurple500 className='job-rating-star' />
                    <p className= {toggle ? 'dark-job-rating' : 'job-rating'}>{rating}</p>
                    </div>        
                </div>  
            </div>
            <div className='job-location-freelance-salary-package-container'>
                <div className='job-location-fulltime-container'>
                <div className={toggle ? 'dark-job-location-container':'job-location-container'}>
                <FaLocationDot  className='job-location'/><p>{location}</p>
                </div>
                <div className={toggle? 'dark-job-fulltime-container' : 'job-fulltime-container'}>
                <BsFillBriefcaseFill className='job-fulltime' /><p>{employementType}</p>
                </div>
                </div>
                <p className={toggle ? 'dark-job-package-salary' : 'job-package-salary'}>{packagePerAnnum}</p>
                </div>
                <hr className='horizontal-line' />
                <h1 className={toggle ? 'dark-job-description-heading' : 'job-description-heading'}>Description :</h1>
                <p className={toggle ? 'dark-job-description' : 'job-description'}>{jobDescription}</p>

                
            
        </li>

    )
}

export default DispalyJobs