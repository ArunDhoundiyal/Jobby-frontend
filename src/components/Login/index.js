import {useState, useEffect} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { FaArrowRightLong } from "react-icons/fa6";
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false)
  const [submitLoginDetail, setSubmitLoginDetail] = useState(null)
  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const [loader, setLoader] = useState(false)
  const [userLoginDetail, setUserLoginDetail] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const postLoginDetail= async()=>{
    if (submitLoginDetail) {
        setLoader(true)
      try {
        const response = await fetch('https://apis.ccbp.in/login', {
          method: 'POST',
          body: JSON.stringify(submitLoginDetail),
        })
        let data = await response.json()
        const {jwt_token, error_msg} = data
        if (response.status === 200 && response.ok === true){
          const jwtToken = jwt_token
          Cookies.set('jwt_token', jwtToken, {expires:30, path:'/'})
          navigate('/', {replace:true})
        }
        else{
            if (response.status === 400 && response.ok === false){
                setLoginErrorMsg(error_msg)
            }
        }
        
      } catch (error) {
        console.log(error)
        setLoginErrorMsg(`An unexpected error occurred. Please try again.`)
      }
      finally{
        setLoader(false)
      }
    }
  } 
  postLoginDetail()
}, [submitLoginDetail, navigate])

  const onSubmitLoginDetails = event => {
    event.preventDefault()
    setSubmitLoginDetail(userLoginDetail)
  }

  const onChangeLoginDetail = event => {
    const {name, value} = event.target
    setUserLoginDetail({...userLoginDetail, [name]: value})
  }

  if (Cookies.get('jwt_token')){
    return <Navigate to='/' />
  }

  return (
    <div className="login-bg-container">
      <form onSubmit={onSubmitLoginDetails} className="login-form-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="job-login-logo-img"
          />
        </div>

        <label className="login-label" htmlFor="userName">
          USERNAME :-
          <input
            placeholder="Username"
            className="login-username-input"
            type="text"
            id="userName"
            name="username"
            value={userLoginDetail.username}
            onChange={onChangeLoginDetail}
          />
        </label>
        <label className="login-label" htmlFor="passWord">
          PASSWORD :-
          <div className="login-password-container">
            <input
              placeholder="Password"
              className="login-password-input"
              type={togglePassword ? 'text' : 'password'}
              id="passWord"
              name="password"
              value={userLoginDetail.password}
              onChange={onChangeLoginDetail}
            />
            <button
              className="login-toggle-button"
              type="button"
              onClick={() => {
                setTogglePassword(!togglePassword)
              }}
            >
              {togglePassword ? (
                <FaEye className="fa-eye" />
              ) : (
                <FaEyeSlash className="fa-eye" />
              )}
            </button>
          </div>
        </label>
        <button type="submit" className="login-button" 
        disabled={!userLoginDetail.username || !userLoginDetail.password}>
            { loader ? 
            <TailSpin
            height={20} 
            width={20} 
            color="#ffffff" 
            ariaLabel="loading" 
            visible={true}
          />
          :<>Login <FaArrowRightLong className='right-login-arrow' /></>
        }
        </button>
        {loginErrorMsg && <p className='login-error-msg'>{loginErrorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
