import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='overflow-hidden '>
      <header>
        <Navbar/>
      </header>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout