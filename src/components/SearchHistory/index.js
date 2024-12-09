import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import { RxCross2 } from "react-icons/rx";
import './index.css'

const SearchHistory = ({eachSearchHistory, deleteHistory, onClickSearchHistory}) => {
    const {searchKeyword, id} = eachSearchHistory 
    const {toggle} = useContext(ToggleContext)
    return(
        <li className={toggle ? 'light-search-history-list' :'search-history-list' }>
            <span onClick={()=>{onClickSearchHistory(searchKeyword)}}>{searchKeyword}</span>
             <RxCross2 onClick={()=>{deleteHistory(id)}} />
        </li>

    )
}

export default SearchHistory