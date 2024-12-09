import {useState, createContext, useEffect} from 'react'

export const ToggleContext = createContext()

export const ToggleContextProvider = ({children}) => {
    const [toggle, setToggle] = useState(()=>{
        const toggleValue = JSON.parse(localStorage.getItem('toggle'))
        return toggleValue ? toggleValue : false
    })
    useEffect(()=>{
        localStorage.setItem('toggle', JSON.stringify(toggle))
    },[toggle])
    return(
        <ToggleContext.Provider value = {{toggle, setToggle}}>{children}</ToggleContext.Provider>

    )
}