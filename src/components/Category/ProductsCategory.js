import { useNavigate, useParams } from 'react-router-dom';
import { TiTick } from 'react-icons/ti'
import { ImLocation } from 'react-icons/im'
import { BiTime } from 'react-icons/bi'
import { GiDuration } from 'react-icons/gi'
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import Loader from '../shared/Loader';

const ProductsCategory = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [booking, setBooking] = useState('null')
    const { id } = useParams();

    const { data: products, isLoading, isError,refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`https://server-tawny-theta.vercel.app/category/${id}?email=${user?.email}`)
            .then(res => res.json())
    });

    const addToWishlist = (product) => {
        fetch(`https://server-tawny-theta.vercel.app/wishlist?email=${user?.email}`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status ==='already added'){
                toast.error('Already added to the wishlist');
            } else {
                toast.success('Successfully added to the wishlist');
                navigate('/dashboard/wishlist');
            }
        })
    };

    if (isLoading) return <Loader />
  if (isError) return (
    <div className='flex items-center justify-center h-[80vh]'>
      <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
    </div>
  )

    if(products.length) return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                products.map(product => {
                    const { _id, image, product_name, location, resale_price, original_price, uses_duration, seller_name, isValid_seller, post_time, wishlist } = product;
                    return <div key={_id} className='shadow-lg p-3 bg-gray-50 rounded space-y-5'>
                        <div className='h-[300px]'>
                            <img src={image} alt="Car images" className='h-[300px] w-full rounded border' />
                        </div>
                        <div className='pl-4 space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-xl font-bold text-gray-700'>Model: {product_name}</h3>
                                <button
                                 disabled={wishlist && true}
                                 onClick={() => addToWishlist(product,refetch)}
                                 className='btn btn-sm btn-secondary'>{wishlist? "Wishlisted": "Add to wishlist"}</button>
                            </div>
                            <p className='text-xl text-gray-700'>Price: <span className='font-bold text-green-500'>${resale_price}</span></p>
                            <p className='text-lg text-gray-700'>Main Price: <span className='font-bold text-yellow-500'>${original_price}</span></p>
                            <div className='relative inline-block'>
                                <h3 className='text-lg font-medium text-black'>Seller: {seller_name}</h3>
                                {isValid_seller && <div className="bg-blue-600 rounded-full text-white absolute top-0 right-[-14px]"><TiTick /></div>}
                            </div>
                            <div className='flex items-center gap-3 text-green-400'>
                                <small className='flex items-center gap-1 font-bold'><BiTime /> {post_time}</small>
                                <small className='flex items-center gap-1 font-bold'><ImLocation /> {location}</small>
                                <small className='flex items-center gap-1 font-bold'><GiDuration /> {uses_duration}</small>
                            </div>
                            <label htmlFor='booking-car' onClick={() => setBooking(product)} className='btn btn-sm btn-success w-full'>Book Now</label>
                        </div>
                    </div>
                })
            }

            {
                booking && (
                    <Modal booking={booking} setBooking={setBooking} />
                )
            }
        </div>
    )

    return (
        <div className='flex items-center justify-center h-[300px]'>
          <h3 className='text-3xl font-semibold text-green-600'>You have no products to display</h3>
        </div>
      )
}

export default ProductsCategory