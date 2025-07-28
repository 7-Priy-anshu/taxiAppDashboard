import React from 'react'

export default function Button(props){
  return (
        <button
      className="
        max-sm:text-[12px] 
        py-1.5 px-2.5 
        mb-2 sm:mb-0 
        cursor-pointer
        sm:text-xs sm:px-6 sm:py-3 
        md:text-[15px] md:px-8 md:py-4 
        lg:px-8 lg:py-[16px] 
        border-2 border-[#76b2ce] 
        rounded-2xl text-[#76b2ce] 
        hover:bg-slate-200 hover:text-black 
        transition duration-300
      ">
      {props.text}
    </button>
    // <button className="m-2 bg-blue-500 cursor-pointer rounded w-44 h-14 hover:bg-blue-700 text-white font-bold px-2" >
    //    {props.text}
    // </button>
  )
}
 
