import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import DispalyJobDetail from './components/DisplayJobDetail'
import NotFound from './components/NotFound'
import './App.css'
const App = () => {

  return(
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login />}/>
      <Route path='/' element={<ProtectedRoute element={<Home />}/>}/>
      <Route path='/jobs' element={<ProtectedRoute element={<Jobs/>} />} />
      <Route path='/job-detail/:id' element={<ProtectedRoute element={<DispalyJobDetail />}/>}/>
      <Route path='/not-found' element={<NotFound/>}/>
      <Route path='*' element={<Navigate to='/not-found'/>}/>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
