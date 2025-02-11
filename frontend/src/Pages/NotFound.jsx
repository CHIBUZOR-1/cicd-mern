import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <div className=' flex h-screen flex-col items-center justify-center'>
        <h1 className=' font-semibold text-[90px]'>404</h1>
        <h2>oops ! Page Not Found</h2>
        <Link to="/home" className=' m-3 p-3 border border-solid active:bg-black active:text-white'>Go Back</Link>
     </div>
  )
}

export default NotFound