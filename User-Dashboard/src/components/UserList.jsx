import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import useApi from './useApi'

function UserList({users}) {
    
const { data: apiUsers, loading, error } = useApi('https://jsonplaceholder.typicode.com/users')

  if (loading) {
    return (
      <div className='p-8 text-center'>
        <div className='text-lg text-gray-600'>Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-8 text-center'>
        <div className='text-red-600'>Error: {error}</div>
      </div>
    )
  }
  const allUsers = [...users, ...(apiUsers || [])]

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>All Users</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>{allUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}</div>
        </div>
    )
}

export default UserList
