import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';
import useToken from '../../hooks/useToken';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {emailPassUserCreate, updateUser, signInGoogle} = useContext(AuthContext);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [token] = useToken(verifiedEmail);
  const navigate = useNavigate();


  if(token) {
    navigate('/');
    toast.success('User created and updated successfully');
  }


  const handleLogin = (data) => {
    const {name,email, password,role} = data;
    emailPassUserCreate(email,password)
    .then(result => {
        updateUser({displayName: name})
        .then(() => {
          saveUser(name, email,role)

        })
    })
  };

  const googleLogin = () => {
    signInGoogle()
    .then(result => {
      const {displayName, email} = result.user;
      const role = 'buyer';
      saveUser(displayName,email,role)
    })
  }

  //saveuser fucntion

  const saveUser = (name,email,role) => {
    const user = {name,email,role};
    fetch(`https://server-tawny-theta.vercel.app/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      setVerifiedEmail(email);
    })
  };




  return (
    <div className='bg-cover bg-center bg-[#13131388] bg-blend-overlay bg-no-repeat h-[80vh] flex justify-center items-center' style={{ backgroundImage: `url(https://images.pexels.com/photos/1008659/pexels-photo-1008659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Register</h3>
        <form onSubmit={handleSubmit(handleLogin)} className='space-y-3'>

        <div>
            <label htmlFor="name" className='text-white font-medium  pl-2'>Your Name</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-red-600'>Please Enter Name</span>}
          </div>

          <div>
            <label htmlFor="email" className='text-white font-medium  pl-2'>Your Email Address</label>
            <input type="email" className="input input-bordered input-accent w-full bg-white"
              {...register('email', { required: true })}
            />
            {errors.mail && <span className='text-red-600'>Please Enter Your email Address</span>}
          </div>

          <div>
            <label htmlFor="password" className='text-white font-medium  pl-2'>Your Password</label>
            <input type="password" className="input input-bordered input-accent w-full bg-white"
              {...register('password', { required: true })}
            />
            {errors.password && <span className='text-red-600'>Please Enter Your Password</span>}
          </div>

          <div>
            <label htmlFor="role" className='text-white font-medium  pl-2'>Choose to Be Buyer or Seller.</label>
            <select defaultValue={'buyer'} className="select select-bordered w-full"{...register('role',{required: true})}>
              <option>seller</option>
              <option>buyer</option>
            </select>
            {errors.password && <span className='text-red-600'>Please Enter Your Password</span>}
          </div>

          <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Submit</button>
          </div>
        </form>
        <h1 className='text-center py-1 text-white'>Have an account? <Link to={'/login'} className='text-success'>Sign in</Link></h1>
        <div className="divider before:bg-opacity-100 before:bg-white after:bg-white after:bg-opacity-100 text-white">OR</div>

        <div className='text-center'>
          <button onClick={googleLogin} className="btn btn-outline btn-success  duration-300 block w-full mx-auto uppercase">Continue with google</button>
        </div>

      </div>
    </div>

  )
}

export default Register;