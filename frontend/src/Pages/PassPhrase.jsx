import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactLoading from 'react-loading';

const PassPhrase = () => {
    const navigate = useNavigate();
    const [dataz, setDataz] = useState({
            email: "",
            passPhrase: "",
    });
    const [load, setLoad] = useState(false);
    const handleChange = (e)=> {
        setDataz({ ...dataz, [e.target.name]: e.target.value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/api/users/new-ph`, dataz)
        if(data.ok) {
            toast.success(data.msg);
            setDataz({
                email: "",
                passPhrase: "",
            })
            setLoad(false);
            navigate('/reset-password'); 
        }
      
        if(!data.ok) {
            toast.error(data.msg);
            setLoad(false);
        }
    }
  return (
    <div className='h-screen w-full dark:bg-facebookDark-300 flex justify-center items-center'>
        <div className=' border border-slate-300 w-[90%] p-1 py-2 flex flex-col gap-2 items-center justify-center'>
                <h2 className=' font-semibold text-2xl'>Create New Passphrase</h2>
                <form className='dark:bg-facebookDark-300 space-y-2' onSubmit={handleSubmit}>
                    <input name='email' value={dataz?.email} onChange={handleChange}  type="text" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='Email...' />
                    <input name='passPhrase' value={dataz?.passPhrase} onChange={handleChange} type="text" className='w-full max-sm:text-sm border p-2 font-semibold outline-blue-400  border-gray-400 rounded-md' placeholder='new phrase...'/>
                    <button type='submit' className='sm:w-[80%] w-full border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md'>
                        {
                            load ? <ReactLoading type='spin' height={10} width={10} color='blue'/> : 'submit'
                        }
                    </button>
                </form>
            </div>
    </div>
  )
}

export default PassPhrase