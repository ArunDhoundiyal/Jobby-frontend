import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const FooterPagination = (
    {
        onDecrementCount, 
        onIncrementCount, 
        paginationCount, 
        totalPage, 
        totalJob, 
        totalPaginationCount
    }
) => {
    const {toggle} = useContext(ToggleContext)
    return(
        <div className="footer-container">
            <div className='pagination-button-container'>
                <button type='button' className='pagination-button' 
                onClick={()=>{onDecrementCount()}}>
                    <MdOutlineArrowBackIos/>
                </button>
                <span className={toggle ? 'light-display-pagination' : 'display-pagination'}>
                    Jobs: {totalPaginationCount}/{totalJob}
                </span>
                <button type='button' className='pagination-button' onClick={()=>{onIncrementCount()}}>
                    <MdOutlineArrowForwardIos />
                </button> 
                <div className={toggle ? 'light-footer-page-number-container':'footer-page-number-container'}>
                Page No: <span className='footer-count'>{paginationCount}/{totalPage}</span>
            </div>           
            </div>  
        </div>

    )
}

export default FooterPagination