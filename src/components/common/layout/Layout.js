import React from 'react'
import Navbar from '../navbar/Navbar'

function Layout({children}) {
  return (
    <main className='bg-image h-screen overflow-hidden'>
      <Navbar/>
      {children}
    </main>
  )
}

export default Layout