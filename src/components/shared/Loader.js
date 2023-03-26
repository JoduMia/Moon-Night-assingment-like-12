import React from 'react'

const Loader = () => {
    return (
        <div className='flex flex-col items-center py-20 text-center'>
            <progress className="progress progress-success w-56 block" ></progress>
            <p className='text-success text-lg font-medium'>Loading...</p>
        </div>
    )
}

export default Loader