import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';

const PrivateRoute = ({children}) => {
    const{loading, user} = useContext(AuthContext);
    const location = useLocation();
    if(loading) {
        return <Loader />
    }
  if(!user) {
    return <Navigate to='/login' state={{from: location}} replace />
  }
  return children;
}

export default PrivateRoute;