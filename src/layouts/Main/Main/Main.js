import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/shared/Footer/Footer'
import Navbar from '../../../components/shared/Header/Navbar'

const Main = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Main