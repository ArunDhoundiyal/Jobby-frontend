import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
const Search = ({submitForm, jobSearch, search, onClickSearchField, displaySearchHistory, onClickBackButton}) =>{
    const {toggle} = useContext(ToggleContext)
    const onClickSubmitButton = (event) => {
        submitForm(event)
    }
    const searchJobs = (event) => {
        jobSearch(event)
    }
    const clickSearchJobs = () => {onClickSearchField()}

    return(
        <form onSubmit={onClickSubmitButton} className='search-bar-container'>
            <>
            {
                displaySearchHistory ? <MdKeyboardBackspace className={toggle ? 'white-search-left-back-button':'search-left-back-button'} onClick={()=>{onClickBackButton()}}  /> : ''
            }
            </>
        <input placeholder='Search Job...?'
        value={search}
         type='search'
         className={toggle ? 'white-search-job':"search-job"}
         onChange={searchJobs} 
         onFocus={clickSearchJobs} 
          />
        <button type='submit' className={toggle ? 'color-search-button' : 'search-button'}><IoIosSearch className='fa-search-icon' /></button>
        </form>
    )
}
export default Search