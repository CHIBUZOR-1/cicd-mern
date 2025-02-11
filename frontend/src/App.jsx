import { useEffect, useState } from 'react'
import Loading from './Components/Loading';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import ForgotPassword from './Pages/ForgotPassword';
import PassPhrase from './Pages/PassPhrase';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(state => state?.user?.user?.id);
  useEffect(() => { 
    setTimeout(() => { 
      setLoading(false); 
    }, 3000);  
  }, []); 
  if (loading) { 
    return <Loading />; 
  }

  return (
    <>
      <ToastContainer className='max-sm:flex max-sm:w-[70%] max-sm:justify-center max-sm:text-sm' />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to="/home" /> :<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/reset-password' element={<ForgotPassword/>}/>
        <Route path='/new-ps-sec' element={<PassPhrase />} />
      </Routes>
    </>
  )
}

export default App
