import React from 'react'

const Error = ({error}) => {
  return (
    <div className='flex items-center justify-center py-10'>
        <div>
        <h1 className='text-lg font-semibold text-red-600'>Oops! Something Wrong Happend!!!</h1>
        <p className='text-sm text-red-600'>{error}</p>
        </div>
    </div>
  )
}

export default Error