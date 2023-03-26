import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import StripeForm from './StripeForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

const Checkout = () => {
    const order = useLoaderData();
    const { image, price, product_name } = order;
    return (
        <div className='lg:w-1/2 mx-auto mt-4'>
            <h1 className='text-2xl font-semibold text-green-500 px-3'>Payment</h1>
            <div className='shadow-lg p-3 bg-gray-50 rounded space-y-5'>
                <div className='h-[300px]'>
                    <img src={image} alt="Car images" className='h-[300px] w-full rounded border' />
                </div>
                <div className='pl-4 space-y-2'>
                    <h3 className='text-xl font-bold text-gray-700'>Model: {product_name}</h3>
                    <p className='text-xl text-gray-700'>Price: <span className='font-bold text-green-500'>${price}</span></p>
                </div>
                <div className='mt-4 border-2 border-green-600 py-10 rounded px-6 shadow'>
                    <Elements stripe={stripePromise}>
                        <StripeForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>

    )
}

export default Checkout