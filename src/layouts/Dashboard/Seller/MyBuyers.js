import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import Loader from '../../../components/shared/Loader'
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider'

const MyBuyers = () => {
  const {user} = useContext(AuthContext);

  const { data: buyers, isLoading, isError } = useQuery({
    queryKey: ['buyers'],
    queryFn: () => fetch(`https://server-tawny-theta.vercel.app/mybuyers/${user?.email}`)
      .then(res => res.json())
  })


  if (isLoading) return <Loader />
  if (isError) return (
    <div className='flex items-center justify-center h-[80vh]'>
      <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
    </div>
  )


  if(buyers.length) return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Email</th>
              <th>location</th>
              <th>Phone</th>
              <th>Product Name</th>
              <th>Product Image</th>
            </tr>
          </thead>

          <tbody>

            {
              buyers.map(buyer => {
                const { _id,name,email,phone,where,image,product_name} = buyer;
                return (
                  <tr key={_id}>
                    <td className='capitalize font-semibold'>
                      {name}
                    </td>
                    <td>{email}</td>
                    <td className='capitalize'>{where}</td>
                    <td className='capitalize'>{product_name}</td>
                    <td>
                      {phone}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
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

export default MyBuyers