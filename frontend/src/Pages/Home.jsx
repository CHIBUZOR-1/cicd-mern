import React, { useRef, useState } from 'react'
import Avatarz from '../Components/Avatarz'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { Modal } from 'antd';
import { logout } from '../Redux/UserSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const user = useSelector(state => state?.user?.user);
  const [load, setLoad]= useState(false);
  const [load1, setLoad1] = useState(false);
  const [load3, setLoad3]= useState(false);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [newInfo, setNewInfo] = useState({
    eml: user?.email,
    uname: user?.username

  });
  const dispatch = useDispatch()
  const [img, setImg] = useState(null);
  const profileImgRef = useRef(null);

  const handleFileUpload = async(file)=> {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const { data }= await axios.post(`${import.meta.env.VITE_API_URL}/api/users/uploadProfilePhoto`, formData);
        return data.filePath;
    } catch (error) {
        console.error('Error uploading file:', error); 
        return null;
    }
  };
  const uploadImg = (e) => {
    const file = e.target.files[0]
    setImg(file)
  }
  const showModal = () => {
    setIsModal(true);
  };
  const handleCancel = () => {
    setIsModal(false);
    setImg(null)
  };
  const handleChange1 = (e)=> {
    setNewInfo({ ...newInfo, [e.target.name]: e.target.value });

  }
  const handleUpdate1 = async()=> {
    setLoad(true)
    const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/update-profile`, newInfo)
    if(data.success) {
      dispatch(updateProfilez(data?.user))
      setLoad(false)
    }
  }
  const handleLogOut = async()=> {
    setLoad3(true)
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`);
    if(data.success) {
      toast.success(data.message);
      dispatch(logout())
      setLoad3(false)
      navigate('/')
    }
  }
  const submitPhoto1 = async()=> {
    setLoad1(true)
    let imageUrl = null;
  
    if(img) { 
      imageUrl = await handleFileUpload(img); 
    }
  
    if(imageUrl) {
      const newPhoto = { image: imageUrl };
      try {
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/newProfilePhoto`, newPhoto);
        if(data.success) {
          setIsModal(false)
          dispatch(updateProfilePic(imageUrl));
          setImg(null)
          setLoad1(false)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Error')
    }
    
  }
  return (
    <div className='w-full h-screen flex-col flex gap-2 bg-slate-50 dark:bg-facebookDark-300 p-1'>
      <div className='flex items-center justify-center'>
        <div className='border-[3px] relative border-facebookDark-700 w-fit rounded-full'>
          <Avatarz height={225} image={user?.profilePic}  width={225} />
          <div onClick={showModal} className={`absolute hover hover:text-slate-50 hover:bg-facebookDark-300 cursor-pointer rounded-full w-8 h-8 bottom-1 p-2 bg-slate-200 flex items-center justify-center right-6 shadow`}><FaCamera /></div>
        </div>
      </div>
      <div className=' w-full flex flex-col gap-2'>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 dark:text-slate-100'>Email</p>
          <input type="email" name='eml' value={newInfo?.eml} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 dark:text-slate-100'>Username</p>
          <input type="text" name='uname' value={newInfo?.uname} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center'>
          <button onClick={handleUpdate1} className={`w-[80%] ${load && 'animate-pulse'} border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md`}>{load? 'updating...':'Update'}</button>
        </div>
        <div className='w-full flex items-center justify-center'>
          <button onClick={handleLogOut} className={`w-[80%] ${load3 && 'animate-pulse'} border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md`}>{load3? 'please wait...':'Logout'}</button>
        </div>
      </div>
      <Modal open={isModal} onCancel={handleCancel} footer={null} className='custom-modal'>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <h2 className=' font-semibold text-xl'>Change Profile Image</h2>
          <div className='w-full flex-col flex items-center gap-2'>
            <Avatarz image={!img?  user?.profilePic : URL.createObjectURL(img)} height={140} width={140}/>
            <button onClick={()=> profileImgRef.current.click()} className={` mt-4 active:bg-slate-700 active:text-slate-200 justify-center md:mt-0 right-4 w-[50%] bottom-4 flex gap-2 cursor-pointer items-center p-1 px-1 rounded font-bold text-sm bg-slate-300`}>Upload photo</button>
            <input onChange={uploadImg} ref={profileImgRef} hidden accept='image/*' type="file" />
            <button onClick={submitPhoto1} className={`border ${load1 && 'animate-pulse'} border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-none bg-blue-600 text-white font-semibold rounded-md w-[80%]`}>{load1? 'uploading...':'Upload'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Home