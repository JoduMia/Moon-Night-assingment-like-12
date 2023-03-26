import React from 'react'
import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../../components/shared/Header/Navbar'
import { AuthContext } from '../../contexts/AuthContext/AuthProvider'
import useAdminChecker from '../../hooks/useAdmin'
import useBuyerChecker from '../../hooks/useBuyer'
import useSellerChecker from '../../hooks/useSeller'

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdminChecker(user?.email);
  const [isSeller] = useSellerChecker(user?.email);
  const [isBuyer] = useBuyerChecker(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-slate-100 shadow text-base-content">
            {isAdmin && <li><Link to='/dashboard/sellers'>All sellers</Link></li>}
            {isAdmin && <li><Link to='/dashboard/buyers'>All Buyers</Link></li>}

            {(isSeller || isAdmin) && <li><Link to='/dashboard/mybuyers'>My Buyers</Link></li>}

            {(isSeller || isAdmin) && <li><Link to='/dashboard/myproduct'>My Products</Link></li>}

            {(isBuyer || isAdmin) && <li><Link to='/dashboard/myorder'>My Order</Link></li>}

            {(isSeller || isAdmin) && <li><Link to='/dashboard/addproduct'>Add Product</Link></li>}

            {(isBuyer || isAdmin) && <li><Link to='/dashboard/wishlist'>Wishlists</Link></li>}

          </ul>

        </div>
      </div>

    </div>
  )
}

export default Dashboard