import React from 'react'


const Avatarz = ({image, width, height}) => {
    const dormant = 'https://th.bing.com/th/id/OIP.hmLglIuAaL31MXNFuTGBgAHaHa?rs=1&pid=ImgDetMain';
  return (
    <div className={`text-slate-800 relative border border-facebookDark-900 w-fit h-fit text-xl font-bold shadow-sm rounded-full`}>
        <div className='rounded-full flex border items-center justify-center relative' style={{width : width+'px', height : height+"px"}}>
            <img src={image || dormant} className='absolute rounded-full inset-0 object-fill w-full h-full' alt={name} /> 
        </div>
    </div>
  )
}

export default Avatarz