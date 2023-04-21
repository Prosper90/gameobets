import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [navbar, setNavbar] = useState(false)


  return (
    <nav className={`flex pt-5 md:justify-evenly justify-between md:gap-24 md:px-auto font-bold text-base items-center text-white default-font ${navbar ?"" : " px-4"}`}>
      <Link to="/" className='md:text-2xl font-extrabold text-2xl'>GAMOLFLIP</Link>
       <button onClick={() => setNavbar(!false)} className=" font-serif border p-2 rounded-md md:hidden flex items-end text-xs flex-col gap-1.5 outline-none  ">
         <span className='w-10 bg-white h-[1.5px]'></span>
         <span className='w-8 bg-white h-[1.5px]'></span>
         <span className='w-10 bg-white h-[1.5px]'></span>
       </button>
     <ul className={`md:flex transition-all z-50 md:flex-row flex-col justify-center gap-20 h-screen md:h-auto md:relative fixed top-0 py-10 md:py-0 bg-[#1e58a4] w-full md:w-auto md:bg-transparent md:gap-44 items-center ${navbar ? "flex" : "hidden "} `}>
       <button  onClick={() => setNavbar(false)} className="absolute text-5xl font-serif md:hidden top-10 right-10 ">&times;</button>
        <li><a href="ALL">ALL FLIPS</a></li>
        <li><a href="STATS">FLIP STATS</a></li>
        <li><Link to="LEADERBOARD">LEADERBOARD</Link></li>
        <button className='border px-5 py-2 rounded-xl'>Connnect to wallet</button>
     </ul>
      
    </nav>
  )
}

export default Navbar