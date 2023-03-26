import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';
import useAdminChecker from '../hooks/useAdmin';
import useBuyerChecker from '../hooks/useBuyer';
import toast from 'react-hot-toast';

const BuyerRoutes = ({children}) => {
    const{ user, logOut} = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdminChecker(user?.email);
    const [isBuyer,buyerLoading] = useBuyerChecker(user?.email);
    if(adminLoading || buyerLoading) {
        return <Loader />
    }
  if(user && (isBuyer || isAdmin)) {
      return children;
}
logOut().then(toast.error("You have tried an forbidden route"))
return <Navigate to='/login' />
}

export default BuyerRoutes;