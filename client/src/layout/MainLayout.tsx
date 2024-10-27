import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'

import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='overflow-hidden dark:bg-gray-900'>
      <header>
        <Navbar/>
      </header>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout