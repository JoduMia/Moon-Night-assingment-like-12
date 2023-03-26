import React from 'react'
import Advertise from '../../components/Advertise/Advertise'
import Banner from '../../components/Banner/Banner'
import Brands from '../../components/Brandings/Brands'
import Category from '../../components/Category/Category'

const Home = () => {
  return (
    <div>
        <Banner />
        <Category />
        <Brands />
        <Advertise />
    </div>

  )
}

export default Home