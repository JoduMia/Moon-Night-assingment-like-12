import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../../../components/shared/Loader';

const AllUsers = () => {
    const {data: users, isLoading, } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://server-tawny-theta.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    })
    console.log(users);

    if(isLoading) return <Loader />
  return (
    <div>AllUsers</div>
  )
}

export default AllUsers