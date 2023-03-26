import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import dateFormat from 'dateformat';
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const hostKey = process.env.REACT_APP_IMGBB_KEY;

  const {data: category=[]} = useQuery({
    queryKey: ['category'],
    queryFn: () => fetch(`https://server-tawny-theta.vercel.app/onlycategory`)
    .then(res => res.json())
  })


  const handleAddProduct = (product) => {

    const {name,pname,location, oprice,rprice, category, duration} = product;

    const image = product.image[0];
    const formData = new FormData();
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${hostKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(gotData => {
        if (gotData.success) {
          const addproduct = {
            seller_name:name,
            seller_email: user?.email,
            product_name:pname,
            original_price: oprice,
            resale_price: rprice,
            uses_duration: duration,
            image: gotData.data.url,
            location,
            category,
            sell_status: 'available',
            ad:false,
            post_time: dateFormat("dddd, mmmm dS, yyyy")
          };

          fetch('https://server-tawny-theta.vercel.app/addproduct', {
            method:'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(addproduct)
          })
          .then(res => res.json())
          .then(data => {
            if(data.acknowledged){
              navigate('/dashboard/myproduct')
              toast.success('Product Added Successfully');
            }
          })
        }
      })


  };
  return (
    <div className='bg-cover bg-center bg-no-repeat bg-[#13131388] bg-blend-overlay h-[150vh] flex justify-center items-center' style={{ backgroundImage: `url(https://i.pinimg.com/originals/6e/85/2a/6e852a3fb510d56bf32c0236c8f44440.jpg)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Add Product</h3>
        <form onSubmit={handleSubmit(handleAddProduct)} className='space-y-3'>

          <div>
            <label htmlFor="name" className='text-white font-medium  pl-2'>Your Name</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-red-600'>Please Enter Your name</span>}
          </div>

          <div>
            <label htmlFor="pname" className='text-white font-medium  pl-2'>Your Product Name</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('pname', { required: true })}
            />
            {errors.pname && <span className='text-red-600'>Please Enter Your Product Name</span>}
          </div>

          <div>
            <label htmlFor="location" className='text-white font-medium  pl-2'>Your Location</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('location', { required: true })}
            />
            {errors.location && <span className='text-red-600'>Please Enter Your location</span>}
          </div>

          <div>
            <label htmlFor="oprice" className='text-white font-medium  pl-2'>Original Price</label>
            <input type="number" className="input input-bordered input-accent w-full bg-white"
              {...register('oprice', { required: true })}
            />
            {errors.oprice && <span className='text-red-600'>Original Price should add </span>}
          </div>

          <div>
            <label htmlFor="rprice" className='text-white font-medium  pl-2'>Resale Price</label>
            <input type="number" className="input input-bordered input-accent w-full bg-white"
              {...register('rprice', { required: true })}
            />
            {errors.rprice && <span className='text-red-600'>Resale Price must add </span>}
          </div>

          <div>
            <label htmlFor="category" className='text-white font-medium  pl-2'>Select Category Price</label>
            <select defaultValue={'Bus'} className="select select-bordered w-full"{...register('category',{required: true})}>
              {category.map(({category, _id}) => <option key={_id}>{category}</option>)}
            </select>
            {errors.category && <span className='text-red-600'>Category must add </span>}
          </div>

          <div>
            <label htmlFor="useduration" className='text-white font-medium  pl-2'>Uses time</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('duration', { required: true })}
            />
            {errors.duration && <span className='text-red-600'>Add how long you use. </span>}
          </div>

          <div>
            <label htmlFor="image" className='text-white font-medium  pl-2'>UpLoad Image</label>
            <input type="file" className="input input-bordered input-accent w-full bg-white"
              {...register('image', { required: true })}
            />
            {errors.image && <span className='text-red-600'>Please upload an image</span>}
          </div>

          <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct