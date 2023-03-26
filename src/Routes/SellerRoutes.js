import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import Loader from '../components/shared/Loader';
import useAdminChecker from '../hooks/useAdmin';
import useSellerChecker from '../hooks/useSeller';
import toast from 'react-hot-toast';

const SellerRoute = ({children}) => {
    const{ user, logOut} = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdminChecker(user?.email);
    const [isSeller,sellerLoading] = useSellerChecker(user?.email);
    if(adminLoading || sellerLoading) {
        return <Loader />
    }
  if(user && (isSeller || isAdmin)) {
      return children;
}
logOut().then(toast.error("You have tried an forbidden route"))
return <Navigate to='/login'  />
}

export default SellerRoute;