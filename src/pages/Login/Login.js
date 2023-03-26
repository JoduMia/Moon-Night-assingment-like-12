import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setLoading, emailPassSignIn,signInGoogle} = useContext(AuthContext);
  const [signInEmail, setSignInEmail] = useState('');
  const [token] = useToken(signInEmail);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if(token) {
    navigate(from, {replace: true});
    toast.success("Log in successfull. !!!")
  }

  const handleLogin = data => {
    const {email,password} = data;
    emailPassSignIn(email, password)
    .then(() => {
      setSignInEmail(email);
      setLoading(false);
    }).catch(err => setError(err.message))
    .finally(() => setLoading(false))
  };

  const googleLogin = () => {
    signInGoogle()
    .then(result => {
      const {displayName, email} = result.user;
      const role = 'buyer';
      saveUser(displayName,email,role)
    })
  }

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
      setSignInEmail(email);
    })
  };

  return (
    <div className='bg-cover bg-center bg-no-repeat bg-[#13131388] bg-blend-overlay h-[80vh] flex justify-center items-center' style={{ backgroundImage: `url(https://i.pinimg.com/originals/6e/85/2a/6e852a3fb510d56bf32c0236c8f44440.jpg)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Login</h3>
        <form onSubmit={handleSubmit(handleLogin)} className='space-y-3'>
          <div>
            <label htmlFor="email" className='text-white font-medium  pl-2'>Your Email Address</label>
            <input type="email" className="input input-bordered input-accent w-full bg-white"
              {...register('email', { required: 'Enter Your email address' })}
            />
            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="password" className='text-white font-medium  pl-2'>Your Password</label>
            <input type="password" className="input input-bordered input-accent w-full bg-white"
              {...register('password', { required: true })}
            />
            {errors.password && <span className='text-red-600'>Please Enter Your Password</span>}
            <label className='label text-white font-medium  pl-2'>Forget Password?</label>
          </div>
          

          <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Submit</button>
          </div>
        </form>
        <h1 className='text-center py-1 text-white'>New to Dream Car ? <Link to={'/register'} className='text-success'>Create an account.</Link></h1>
        <div className="divider before:bg-opacity-100 before:bg-white after:bg-white after:bg-opacity-100 text-white">OR</div>

        <div className='text-center'>
          <button onClick={googleLogin} className="btn btn-outline btn-success  duration-300 block w-full mx-auto uppercase">Continue with google</button>
        </div>

      </div>
    </div>

  )
}

export default Login