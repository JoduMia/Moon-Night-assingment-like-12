import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loader from '../../../components/shared/Loader'
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider'

const MyOrders = () => {
  const { user,logOut } = useContext(AuthContext);

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch(`https://server-tawny-theta.vercel.app/mybookings?email=${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if(res.status === 401 || res.status === 403){
          logOut()
          .then(toast.error('Got logout due to unauthorize aceess'));
          return;
        }
        return res.json();
      })
  })

  if (isLoading) return <Loader />
  if(isError) return (
    <div className='flex items-center justify-center h-[80vh]'>
      <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
    </div>
  )


  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {
              orders.map(order => {
                const { _id,image, price, product_name, status } = order;
                return (
                  <tr key={_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{product_name}</td>
                    <td className='font-bold'>${price}</td>
                    <th>
                      <Link to={`/dashboard/checkout/${_id}`} className="btn btn-success btn-sm" disabled={status=== 'paid' && true}>{status === 'unpaid' ? 'Pay': 'Paid'}</Link>
                    </th>
                  </tr>
                )

              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders