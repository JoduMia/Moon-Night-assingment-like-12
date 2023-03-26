import React from 'react';

const images = [
    {id:1, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/241/buy-cars-honda.png', brand:'Honda'},
    {id:2, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/46/buy-cars-toyota.png', brand:'Toyota'},
    {id:3, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/240/buy-cars-nissan.png', brand:'Nissan'},
    {id:4, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/360/buy-cars-piaggio.png', brand:'Piaggio'},
    {id:5, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/238/buy-cars-mercedes-benz.png', brand:'Saab'},
    {id:6, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/32/buy-cars-mitsubishi.png', brand:'Proton'},
    {id:7, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/40/saab.png', brand:'Marcedes'},
    {id:8, pic: 'https://garirbazar.s3.amazonaws.com/uploads/brand/icon/45/buy-cars-suzuki.png', brand:'Suzuki'},
]
const Brands = () => {
    return (
        <div className='px-6 pt-14'>
            <h3 className='text-center text-2xl lg:text-4xl font-bold text-green-500 mb-10 capitalize'>Our brands</h3>
            <div className='grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3'>
            {
                images.map(({id,pic,brand}) => (
                    <div key={id} className='w-1/2 md:w-full mx-auto'>
                        <div className='lg:w-full'>
                            <img src={pic} alt="" />
                        </div>
                        <h3 className='text-center text-blue-500'>{brand}</h3>
                    </div>
                ))
            }
        </div>
        </div>
    )
}

export default Brands