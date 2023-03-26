import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import Loader from '../../../components/shared/Loader'

const Seller = () => {

  const { data: sellers, isLoading, isError, refetch } = useQuery({
    queryKey: ['sellers'],
    queryFn: () => fetch(`https://server-tawny-theta.vercel.app/sellers`)
      .then(res => res.json())
  })


  const verifyUser = (id,email, refetch) => {
    fetch(`https://server-tawny-theta.vercel.app/verifyuser/${id}?email=${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Successfully verified the user');
          refetch();
        }
      })
  };




  const deleteUser = (id, name, refetch) => {
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


  if(sellers.length) return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Email</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {
              sellers.map(seller => {
                const { _id,name,email,isVerified} = seller;
                return (
                  <tr key={_id}>
                    <td>
                      {name}
                    </td>
                    <td>{email}</td>
                    <td>
                      <button
                        onClick={() => verifyUser(_id, email, refetch)}
                        className="btn btn-success btn-sm"
                        disabled={isVerified && true}>
                        {!isVerified ? 'Vefify User'
                          : 'Already Verified'
                        }
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteUser(_id,name, refetch)}
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

export default Seller