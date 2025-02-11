import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../Redux/UserSlice';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        firstInput: '',
        password: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e)=> {
        setInfo({ ...info, [e.target.name]: e.target.value });
    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signIn`, info);
        if(response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.details));
            setLoading(false)
            navigate('/home');
        } 
            
        if(!response.data.success) {
          setLoading(false)
          toast.error(response.data.message);
            
        }
    }
  return (
    <div className='flex flex-col justify-center h-screen p-2 items-center gap-2'>
        <input type="text" value={info.firstInput} name='firstInput' onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md'  placeholder='Username/email' />
        <input type="password" value={info.password} name='password' onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md'   placeholder='password'/>
        <div className='w-full flex items-center justify-end p-1'>
          <p onClick={()=> navigate('/reset-password')} className='text-blue-500 hover:underline cursor-pointer'>forgot password?</p>
        </div>
        <div className='flex mt-6 w-full justify-center max-[400px]:text-[12px] max-[500px]:text-[14px] items-center space-x-2 px-1'>
          <p className='text-slate-600'>Don't have an account?</p>
          <p onClick={()=>navigate('/reg')} className='text-blue-500 dark:text-blue-400 max-sm:text-xs cursor-pointer'>Sign Up</p>
        </div>
        <button onClick={handleSubmit} className='w-[80%] border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md'>
            sign in
        </button>
    </div>
  )
}

export default Login