import {useEffect, useState, useCallback, useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import { VscError } from "react-icons/vsc";


const Profile = () => {
    const {toggle} = useContext(ToggleContext)
    const jwtToken = Cookies.get('jwt_token')
    const [userProfileData, setUserProfileData] = useState(null)
    const [profileErrorMsg, setProfileErrorMsg] = useState('')
    const [profileError, setProfileError] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchUserProfileDetails = useCallback(async() => {
        setLoading(true)
        try {
            const response = await fetch('https://apis.ccbp.in/profile', {method:'GET', 
                headers:{'Authorization':`Bearer ${jwtToken}`}})
                const {status, ok} =response
                if (status === 200 && ok){
                    const data = await response.json()
                    const {profile_details} = data
                    setUserProfileData({
                        name:profile_details.name, 
                        profileImageUrl: profile_details.profile_image_url,
                        shortBio:profile_details.short_bio
                    })
                }
                else{
                    setProfileErrorMsg('Failed to fetch profile details.') 
                    setProfileError(true)
                }
            
        } catch (error) {
            setProfileErrorMsg(`An error occurred. Please try again later.`)
            console.log(error)
            setProfileError(true)
        }
        finally{
            setLoading(false)
        }
    },[jwtToken])

    useEffect(()=>{
        fetchUserProfileDetails()
    },[fetchUserProfileDetails])

    const displayProfileView = () => {
        if (loading){
            return (
                <div className='profile-loading-error-container'>
                <ThreeDots
                visible={true}
                height="50"
                width="50"
                color={toggle ? '#4f46e5':"#ffffff"}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div>            
            )
        }
        if (profileError){
            return(
                <div className='profile-loading-error-container'>
                <VscError className='error-icon' />
                    <p className={toggle ? 'white-user-profile-error-msg':'user-profile-error-msg'}>{profileErrorMsg}</p>
                    <button className='user-profile-retry-button' onClick={fetchUserProfileDetails}>Retry</button>
                </div>
            )
        }
        return (
            <div className='profile-container'>
            {!userProfileData ? (<p className='profile-user profile-user-loading'>Loading ...</p>) :
                (<div className='user-profile-container'>
                    <div>
                    <img src={userProfileData.profileImageUrl} alt='profile-pic' />
                    </div>
                    <h1 className='profile-user-name'>{userProfileData.name}</h1>
                    <p className='profile-user'>{userProfileData.shortBio}</p>
                    </div>
                )
            }
        </div>
        )
    }
    return(
        <>
        {displayProfileView()}
        </>

    )
}

export default Profile