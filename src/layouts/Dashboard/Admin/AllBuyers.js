import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import Loader from '../../../components/shared/Loader'

const AllBuyers = () => {

  const { data: buyers, isLoading, isError, refetch } = useQuery({
    queryKey: ['buyers'],
    queryFn: () => fetch(`https://server-tawny-theta.vercel.app/buyers`)
      .then(res => res.json())
  })


  const deleteBuyer = (id, name, refetch) => {
    const agree = window.confirm(`Are you sure to delete "${name}"`);
    if (agree) {
      fetch(`https://server-tawny-theta.vercel.app/deleteseller/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            toast.success('Successfully Deleted');
            refetch();
          }
        })
    }
  };

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
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {
              buyers.map(buyer => {
                const { _id,name,email} = buyer;
                return (
                  <tr key={_id}>
                    <td>
                      {name}
                    </td>
                    <td>{email}</td>

                    <td>
                      <button
                        onClick={() => deleteBuyer(_id,name, refetch)}
                        className="btn btn-success btn-sm">Delete
                      </button>
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

export default AllBuyers