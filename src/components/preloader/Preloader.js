import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";


export default function Smallpreloader({loader}) {
  


  const colorAdd = "#553CDF"

  return (
    <div className='absolute top-0 flex justify-center items-center p-4 w-[100%] h-[100%] opacity-100 z-[9999]' style={{backgroundColor : 'rgb(0, 0, 0, 0.7)'}}>
       <BeatLoader
            loading={loader}
            color={colorAdd}
            size={25}
       />
    </div>
  )
}
