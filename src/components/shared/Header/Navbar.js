import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const menu = <>
  <li><Link to='/'>Home</Link></li>
  <li><Link to='/blogs'>Blogs</Link></li>
  {user?.uid && <li><Link to='/dashboard'>Dashboard</Link></li>}
</>

  const handleLogOut = () => {
    logOut()
      .then(toast.success('Successfully Logged Out'))
  };

  return (
    <div className="navbar bg-slate-50 shadow px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menu}
          </ul>
        </div>
        <Link to='/' className="normal-case text-2xl font-bold">Dream<span className='text-yellow-400'>Car</span></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {menu}
        </ul>
      </div>
      {
        user?.uid
          ?
          <div className="navbar-end">
            <label htmlFor='my-drawer-2' className='text-3xl cursor-pointer text-[#046b72] lg:hidden mr-2'><MdOutlineSpaceDashboard /></label>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" alt='' />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-50 rounded-box w-52">
                <li>
                  <Link className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link>Settings</Link></li>
                <li><button onClick={handleLogOut} className='btn btn-secondary btn-sm'>Logout</button></li>
              </ul>
            </div>
          </div>
          :
          <div className='navbar-end'>
            <Link to='/login'>Login</Link>
          </div>
      }
    </div>
  )
}

export default Navbar