import {useState, useEffect, useCallback, useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import FooterPagination from '../FooterPagination'
import Profile from '../Profile'
import Navbar from '../Navbar'
import DisplayJobs from '../DisplayJobs'
import { VscError } from "react-icons/vsc";
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import FilterEmploye from '../FilterEmploye'
import Search from '../Search'
import FilterSalaryRange from '../FilterSalaryRange'
import { MdOutlineErrorOutline } from "react-icons/md";
import './index.css'
const Jobs = () => {
    const {toggle} = useContext(ToggleContext)
    const [employeType, setEmployeType] = useState([])
    const [salaryRange, setSalaryRange] = useState('')
    const [jobData, setJobData] = useState([])
    const [totalResult,setTotalResult] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [failureMsg, setFailureMsg] = useState('')
    const [failure, setfailure] = useState(false)
    const [search, setSearch] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [searchParameter, setSearchParameter] = useState(null)
    const [paginationCount, setPaginationCount] = useState(1)
    const [paginationData, setPaginationData] = useState([])
    const [totalPaginationCount, setTotalPaginationCount] = useState(0)


    useEffect(() => {
        const limit = 5;
        const offset = (paginationCount - 1) * limit;
        const pagination = jobData.slice(offset, offset + limit);
        setTotalPaginationCount(Math.min(offset + limit, jobData.length));
        setPaginationData(pagination);
    }, [paginationCount, jobData]);


    const onDecrementCount = () => {
        if (paginationCount >= 2){
            setPaginationCount(preCount => preCount - 1)
        }

    }

    const onIncrementCount = () => {
        if (paginationCount <= Math.ceil(((jobData.length)/5)-1)){
            setPaginationCount(preCount => preCount + 1)
        }

    }

    const jobSearch = (event) => {
        setSearch(event.target.value)
    }

    const submitSearchForm = (event) => {
        event.preventDefault() 
        setSearchParameter(search)
    }

    const onFilterEmploye = (event) => {
        const {checked, value} = event.target
        if (checked){
          setEmployeType([...employeType, value])
        }
        else{
          setEmployeType(
            employeType.filter(type => type !== value)
          )
        }
    }
    const onFilterSalaryRange = (event) => {
        setSalaryRange(event.target.value)
    }

    const jwtToken = Cookies.get('jwt_token')


    const fetchJobsDetails = useCallback(async()=>{
        setLoading(true)
        setError(false)
        setfailure(false)

        try {
            const response = 
            await fetch(`https://apis.ccbp.in/jobs?employment_type=${employeType.join(',')}&minimum_package=${salaryRange}&search=${searchParameter ? searchParameter : ''}`, 
            {
                method:'GET', headers:{'Authorization':`Bearer ${jwtToken}`}
            })
            if (response.ok && response.status === 200){
                const data = await response.json() 
                
                const {jobs, total} = data
                const jobListData = jobs.map(eachJobItem => ({
                    companyLogoUrl:eachJobItem.company_logo_url,
                    employementType:eachJobItem.employment_type,
                    id:eachJobItem.id,
                    jobDescription:eachJobItem.job_description,
                    location:eachJobItem.location,
                    packagePerAnnum:eachJobItem.package_per_annum,
                    rating:eachJobItem.rating,
                    title:eachJobItem.title
                }))
                setJobData(jobListData)
                setTotalResult(total)
            }
            else{
                setfailure(true)
                setFailureMsg('Sorry failed to fetch data from the server.')
            }

            
        } catch (error) {
            setError(true)
            setErrorMsg(error.message)
        }
        finally{
            setLoading(false)
        }

    },[jwtToken, employeType, salaryRange, searchParameter])

    useEffect(()=>{
        fetchJobsDetails();
    },[fetchJobsDetails])


    const footer = () => {
        return(
            <FooterPagination 
            onDecrementCount={onDecrementCount} 
            onIncrementCount={onIncrementCount} 
            paginationCount={paginationCount} 
            totalPage={Math.ceil((jobData.length)/5)} 
            totalJob={totalResult} 
            totalPaginationCount={totalPaginationCount}
              /> 
        )
    }
    
    const displayAllJobs = () => {
        if (loading){
            return(
                <div className={toggle ? 'white-three-dot-loader-and-error-msg-container':'three-dot-loader-and-error-msg-container'}>
                <ThreeDots
                visible={true}
                height="50"
                width="50"
                color={toggle ? '#4f46e5' : "#ffffff"}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div>

            )
        }
        if (error){
            return (
                <div className={toggle ? 'white-failure-view-bg-container' : 'failure-view-bg-container'}>
                    <VscError className='vs-error-icon' />
                <h1 className='failure-view-heading'>Oops! Something Went Wrong.</h1>
                <p className={toggle ? 'white-failure-view-msg':'failure-view-msg'}>We can not seem to find the page you are looking for...!</p>
                <p className={toggle ? 'white-failure-view-msg':'failure-view-msg'}>{errorMsg} network error..!</p>
                <button className='failure-view-retry-button' onClick={fetchJobsDetails}>Retry</button>
    
            </div>
            )
        }
        if (failure){
            return(
                <div className='failure-view-container'>
                    <MdOutlineErrorOutline className='error-logo' />
                    <h1 className={toggle ? 'white-failure-msg':'failure-msg'}>{failureMsg}</h1>
                    <button type='button' className='retry-button' onClick={fetchJobsDetails}>Retry</button>
                </div>
            )
        }
        return (
            <div className= {toggle ? 'white-display-jobs-bg-container':'display-jobs-bg-container'}>
                <div className={toggle ? 'light-total-jobs-search-container':'total-jobs-search-container'}>
                <Search submitForm={submitSearchForm}  jobSearch={jobSearch}  search={search} />
                </div>

            <ul className='dispaly-jobby-job-container'>{
                paginationData.length === 0 ? 
                (
                    <>
                    <img className='no-jobs-img' src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='no jobs' />
                    <h1 className={toggle ? 'light-no-job-heading' : 'no-job-heading'}>No Jobs Found.</h1>
                    <p className={toggle ? 'light-no-job-msg' : 'no-job-msg'}>We could not find any jobs. Try other filters.</p>
                    </>
                    
                )
                :
                paginationData.map(eachJob => {
                   return <
                    DisplayJobs 
                   key={eachJob.id} 
                   eachJob={eachJob} 
                   />
                })
            }
            </ul>
            </div>    
        )
    } 

    return(
        <div className='jobs-page-bg-container'>
            <Navbar />

        <div className={toggle ? 'white-job-filter-container':'job-filter-container'}>
            <div className={toggle ? 'white-search-container' : 'search-container'}>
                <Search submitForm={submitSearchForm}  jobSearch={jobSearch}  search={search} />
 
            </div>
            <Profile />
            <hr className="horizontal-separate-line" />
            <FilterEmploye onChangeFilterEmploye={onFilterEmploye} />
            <hr className="horizontal-separate-line" />
            <FilterSalaryRange onChangeFilterSalaryRange={onFilterSalaryRange} />
            <hr className="horizontal-separate-line" />
            <div className='footer-card-container'>
            {footer()} 
            </div>
            
            </div>
            <>
            {
            displayAllJobs()
            }
            </>  
            <div className={toggle ? 'light-footer' : 'footer'}>    
                {footer()}        
            </div>

        </div>
    )
}


export default Jobs



