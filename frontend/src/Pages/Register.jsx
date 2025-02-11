import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [info, setInfo] = useState({
      username: "",
      email: "",
      passPhrase: '',
      password: "",
      confirmPassword: ""
    });
    const handleChange = (e)=> {
      setInfo({ ...info, [e.target.name]: e.target.value });
  
    }
    const handleSubmit = async(e)=> {
      e.preventDefault();
      setLoading(true)
        if(info.confirmPassword === info.password) {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signUp`, info);
          if(data.success) {
            toast.success(data.message);
            setInfo({
              username: "",
              email: "",
              passPhrase: "",
              password: "",
              confirmPassword: ""
            })
            setLoading(false)
            navigate('/')
          }
          if(!data.success) {
            toast.warn(data.message)
            setLoading(false)
          }
        
        } 
    }
  return (
    <div className='w-full h-screen items-center flex justify-center p-2'>
        <div className='flex flex-col items-center gap-2 w-full'>
            <input type="text" value={info.username} onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md'  name="username"  placeholder='Username'/>
            <input type="email" value={info.email} onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' name='email'  placeholder='email'/>
            <input type="text" value={info.passPhrase} onChange={handleChange} name='passPhrase' className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md'  placeholder='security phrase...'/>
            <div className='flex items-center max-[400px]:flex-col gap-1 justify-between w-full'>
                <input type="password" name='password' value={info.password} onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md'  placeholder='password'/>
                <input type="password" name='confirmPassword' value={info.confirmPassword} onChange={handleChange} className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='confirm password'/>
            </div>
            <div className='flex w-full justify-center max-[400px]:text-[12px] max-[500px]:text-[14px] items-center space-x-2 px-1'>
              <p className='text-slate-600'>Already have an account?</p>
              <p onClick={()=>navigate('/')} className='text-blue-500 cursor-pointer'>Sign In</p>
            </div>
            <button onClick={handleSubmit} className='w-[80%] border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md'>Sign Up</button>
        </div>
    </div>
  )
}

export default Register