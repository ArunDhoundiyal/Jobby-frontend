import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import { IoIosSearch } from "react-icons/io";
const Search = ({submitForm, jobSearch, search}) =>{
    const {toggle} = useContext(ToggleContext)
    const onClickSubmitButton = (event) => {
        submitForm(event)
    }
    const searchJobs = (event) => {
        jobSearch(event)
    }


    return(
        <form onSubmit={onClickSubmitButton} className='search-bar-container'>
        <input placeholder='Search Job...?'
        value={search}
         type='search'
         className={toggle ? 'white-search-job':"search-job"}
         onChange={searchJobs} 

          />
        <button type='submit' className={toggle ? 'color-search-button' : 'search-button'}><IoIosSearch className='fa-search-icon' /></button>
        </form>
    )
}
export default Search