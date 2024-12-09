import {useContext} from 'react'
import { IoSunny } from "react-icons/io5";
import {ToggleContext} from '../ToggleContext'
import { IoMoonSharp } from "react-icons/io5";
import './index.css'

const Toggle = () => {
    const {toggle, setToggle} = useContext(ToggleContext)
    return(
        <div className='toggle-button' onClick={()=>{setToggle(preToggle => !preToggle)}}>
            {
                toggle ? <IoMoonSharp className="dark-toggle" /> : <IoSunny className="toggle" />
            }
        </div>

    )
}

export default Toggle 