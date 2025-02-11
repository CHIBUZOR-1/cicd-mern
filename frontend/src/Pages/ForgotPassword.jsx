import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [dataz, setDataz] = useState({
        email: "",
        passPhrase: "",
        newPassword: "",
        confirmNewPassword: ""
  });
  const [load, setLoad] = useState(false);

  const handleChange = (e)=> {
    setDataz({ ...dataz, [e.target.name]: e.target.value });

}
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      if(dataz.confirmNewPassword === dataz.newPassword) {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/reset-pw`, dataz)
        if(data.ok) {
            toast.success(data.msg);
            setDataz({
                email: "",
                passPhrase: "",
                newPassword: "",
                confirmNewPassword: ""
            })
            setLoad(false);
            navigate('/');   
        }
  
        if(!data.ok) {
            toast.error(data.msg);
            setLoad(false);
        }  
        }
    } catch (error) {
        console.error('Error fetching all blogs:', error);
    } finally {
        setLoad(false)
    }
    
  }
  return (
    <div className='h-screen w-full dark:bg-facebookDark-300 flex justify-center items-center'>
            <div className=' border rounded-md p-2 w-[90%]  py-2 flex flex-col gap-2 items-center justify-center'>
                <h2 className=' font-semibold text-2xl'>RESET PASSWORD</h2>
                <form className='dark:bg-facebookDark-300 space-y-2' onSubmit={handleSubmit}>
                    <input name='email' value={dataz?.email} onChange={handleChange}  type="email" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='Email...' />
                    <input name='passPhrase' value={dataz?.passPhrase} onChange={handleChange} type="text" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='security phrase...'/>
                    <input name='newPassword' value={dataz?.newPassword} onChange={handleChange} type="password" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='new password...'/>
                    <input name='confirmNewPassword' value={dataz?.confirmNewPassword} onChange={handleChange} type="password" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='confirm password'/>
                    <button type='submit' className='sm:w-[80%] w-full border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md'>
                        {
                            load ? <ReactLoading type='spin' height={10} width={10} color='blue'/> : 'submit'
                        }
                    </button>
                </form>
                <div className='w-full flex p-2 justify-end items-center'>
                    <p onClick={()=> navigate('/new-ps-sec')} className='text-blue-500 font-medium hover:underline cursor-pointer'>forgot security phrase?</p>
                </div>
                
            </div>

    </div>
  )
}

export default ForgotPassword