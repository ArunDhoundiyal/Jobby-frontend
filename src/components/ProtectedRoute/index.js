import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({element:Component}) => {
    if (Cookies.get('jwt_token')===undefined){
        return <Navigate to='/login' />
    }
    return Component;
}

export default ProtectedRoute