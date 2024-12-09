import {useState, useEffect, useCallback, useContext} from 'react'
import { ToggleContext } from '../ToggleContext';
import { useParams } from "react-router-dom"
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import {ThreeDots} from 'react-loader-spinner'
import { VscError } from "react-icons/vsc";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import './index.css'

const DisplayJobDetail = () => {
    const {toggle} = useContext(ToggleContext)
    const [jobDetailDes, setJobDetailDes] = useState({})
    const [sameJob, setSameJob] = useState([])
    const [faliureMsg, setFailureMsg] = useState('')
    const [failure, setFailure] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [error, setError] = useState(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const jwtToken = Cookies.get('jwt_token')

    const displayJobDetail = useCallback(async() => {
        setLoading(true)
        setFailure(false)
        setError(false)
        try {
            const response = await fetch(`https://apis.ccbp.in/jobs/${id}`,
                {method:'GET', headers:{'Authorization':`Bearer ${jwtToken}`}})
            const {status, ok} = response
            if (ok && status === 200){
                const data = await response.json() 
                const formatData = [data].map(eachObj => ({
                    jobDetails:eachObj.job_details,
                    similarJob:eachObj.similar_jobs
                }))
                const {jobDetails,similarJob } = formatData[0]
                setJobDetailDes({
                    id:jobDetails.id,
                    companyLogoUrl:jobDetails.company_logo_url,
                    companyWebsiteUrl:jobDetails.company_website_url,
                    employmentType:jobDetails.employment_type,
                    jobDescription:jobDetails.job_description,
                    lifeAtCompany:
                    {
                        description:jobDetails.life_at_company.description, 
                        imageUrl:jobDetails.life_at_company.image_url
                    },
                    location:jobDetails.location,
                    packagePerAnnum:jobDetails.package_per_annum,
                    rating:jobDetails.rating,
                    skills:jobDetails.skills ? jobDetails.skills.map(skillItem => ({
                        name:skillItem.name,
                        imageUrl:skillItem.image_url,
                    })) : [],
                    title:jobDetails.title
                })
                setSameJob(similarJob.map(eachJob => ({
                    id:eachJob.id,
                    companyLogoUrl:eachJob.company_logo_url,
                    employmentType:eachJob.employment_type,
                    jobDescription:eachJob.job_description,
                    location:eachJob.location,
                    rating:eachJob.rating,
                    title:eachJob.title  
                })))
            }
            else{
                setFailureMsg('Sorry failed to fetch data from the server.')
                setFailure(true)

            }
        } catch (error) {
            setErrorMsg('An error occurred. Please try again later.')
            setDisplayErrorMessage(error.message)
            setError(true) 
        }
        finally{
            setLoading(false)
        }

    },[jwtToken, id])

    useEffect(()=>{
        displayJobDetail()

    }, [displayJobDetail])

    const {companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany={},
        location,
        packagePerAnnum,
        rating,
        skills,
        title
    } = jobDetailDes
    const renderDisplayJobDetailsMsg = () => {
        if (loading){
            return(
                <div className='three-dot-loader-and-error-msg-container'>
                <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#ffffff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div>
            )
        }

        if (failure){
            return(
                <div className='display-job-failure-view-container'>
                    <MdOutlineErrorOutline className='error-logo' />
                    <h1 className='failure-msg'>{faliureMsg}</h1>
                    <button type='button' className='retry-button' onClick={displayJobDetail}>Retry</button>
                </div>
            )
        }
        if (error){
            return(
                <div className='display-job-error-msg-container'>
                    <VscError className='vs-error-icon' />
                    <h1>{displayErrorMessage} network error.</h1>
                    <p>{errorMsg}</p>
                    <button type='button' className='retry-button' onClick={displayJobDetail}>Retry</button>
                </div>
            )

        }

        return(
            <>
            <div className={toggle ? 'white-job-detail-card-container':'job-detail-card-container'}>
                <div className='job-detail-company-logo-container'>
                    <img src={companyLogoUrl} alt='company-logo' className='style-company-logo' />
                    <div className='job-detail-jobrole-start-card-container'>
                    <h1 className={toggle ? 'white-job-role-title-heading':'job-role-title-heading'}>{title}</h1>
                    <div className='job-detail-rating-card-container'>
                    <MdOutlineStarPurple500 className='job-star-rating'/>
                    <p className={toggle ? 'white-job-detail-rating':'job-detail-rating'}>{rating}</p>
                    </div>
                    </div>
                </div>
                <div className='job-detail-location-work-type-package-container'>
                    <div className='job-detail-location-job-type-container'>
                        <div className={toggle ? 'white-job-detail-location-container':'job-detail-location-container'}>
                        <FaLocationDot className='job-detail-location' />
                        <p>{location}</p>
                        </div>
                        <div className={toggle ? 'white-job-detail-employment-type-container':'job-detail-employment-type-container'}>
                        <BsFillBriefcaseFill className='job-detail-jo-bag' />
                        <p>{employmentType}</p>
                        </div>   
                    </div>
                    <p className={toggle?'white-job-detail-package-text':'job-detail-package-text'}>{packagePerAnnum}</p>
                </div>
                <hr className='job-detail-hr-line' />
                <div className='job-detail-description-visit-card-container'>
                <div className='job-detail-description-visit-container'>
                <h1 className={toggle ? 'white-job-detail-description-heading':'job-detail-description-heading'}>Description</h1>
                <a className='visit-link' href={companyWebsiteUrl} target="_blank" rel="noopener noreferrer">
                    Visit <GrShare className='visit-logo' />
                </a>
                </div>
                <p className={toggle ?  'white-desciption':'desciption'}>{jobDescription}</p>
                </div>
                <div className='job-detail-skill-container'>
                    <h1 className={toggle ? 'white-skill-heading':'skill-heading'}>Skills :</h1>
                    <ul className='job-detail-skill-showcase-container'>
                        {
                        skills && skills.length > 0 ? (
                            skills.map(eachSkills => (
                                <li key={eachSkills.name} className='job-detail-skill-logo-name-container'>
                                    <img src={eachSkills.imageUrl} alt= {eachSkills.name} className='skill-logo' />
                                    <p className={toggle ? 'white-job-detail-skill-name-text':'job-detail-skill-name-text'}>{eachSkills.name}</p>
                                </li>
                            ))                        
                        ):(
                            <p className={toggle?'white-job-detail-no-skill-text':'job-detail-no-skill-text'}>No skills available</p>
                        )
                        }
                    </ul>
                </div>
                <div className='job-detail-life-at-company-container'>
                    <div className='life-at-company-job-detail-container'>
                        <h1 className={toggle ? 'white-job-detail-life-at-company-heading':'job-detail-life-at-company-heading'}>Life at Company :</h1>
                        <p className={toggle ? 'white-job-detail-life-at-company-text':'job-detail-life-at-company-text'}>{lifeAtCompany.description}</p>
                    </div>
                    <img className='style-life-at-company-img' src={lifeAtCompany.imageUrl} alt='life-at-company-img' />
                </div>
            </div>
            <>
            <h1 className={toggle ? 'white-similar-job-heading':'similar-job-heading'}>Similar Jobs</h1>
            <ul className='similar-job-detail-container'>
            {
                sameJob.map(eachSimilarJob => (
                    <li className={toggle?'white-similar-job-card-container':'similar-job-card-container'} key={eachSimilarJob.id}>
                        <div className='similar-job-company-logo-container'>
                            <img alt='company-logo' src={companyLogoUrl} className='company-logo-similar-job-img' />
                            <div>
                                <h1 className='similar-job-title'>{title}</h1>
                                <div className='similar-job-star-rating-container'>
                                    <MdOutlineStarPurple500 className='job-star-rating'/>
                                    <p className='rating-similar-job'>{rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className='similar-job-description-container'>
                            <h1 className='similar-job-description'>Description</h1>
                            <p className='similar-job-description-content'>{jobDescription}</p>
                        </div>
                        <div className='similar-job-location-work-type-container'>
                            <div className='similar-job-location-container'>
                            <FaLocationDot className='job-detail-location' />
                            <p>{location}</p>
                            </div>
                            <div className='similar-job-work-type-container'>
                            <BsFillBriefcaseFill className='job-detail-jo-bag' />
                            <p>{employmentType}</p>
                            </div>
                        </div>
                    </li>
                ))
            }

        </ul>
        </>
        </>
        )
    }

    return(
        <div className={toggle ? 'white-display-job-detail-bg-container':'display-job-detail-bg-container'}>
            <Navbar />
            {renderDisplayJobDetailsMsg()}
        </div>

    )
}

export default DisplayJobDetail