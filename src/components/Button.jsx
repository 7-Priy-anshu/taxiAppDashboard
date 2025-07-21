import React from 'react'

export default function Button(props){
  return (
    <button className="m-2 bg-blue-500 cursor-pointer rounded w-44 h-14 hover:bg-blue-700 text-white font-bold px-2" >
       {props.text}
    </button>
  )
}
 
