import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{backgroundImage: `url('https://static3.depositphotos.com/1002881/151/i/600/depositphotos_1519030-stock-photo-error-404.jpg')`}} className='bg-cover bg-no-repeat h-screen w-full bg-center'>
        <div className='text-center text-yellow-400 pt-20'>
            <h3 className='text-2xl lg:text-4xl font-bold mb-6'>Oops! You are navigating a invalid route.</h3>
            <Link to='/' className='btn btn-sm btn-secondary'>Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound