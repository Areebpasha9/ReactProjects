import React from 'react'
import { Link } from 'react-router-dom'

function UserCard({user}) {
    return (
        <div className='bg-white rounded-lg shadow p-6'>
            <h3 className=' text-xl font-bold text-gray-800 mb-2'>{user.name}</h3>
            <p className='text-gray-600 mb-1'>Email:{user.email} </p>
            <p className='text-gray-600 mb-1'>Phone:{user.phone} </p>
            {/* <p className='text-gray-600 mb-1'>Company:{user.company.name}</p> */}

            <Link to={`/users/${user.id}`} className='text-blue-600 hover:text-blue-800 font-medium'>View Details</Link>
        </div>
    )
}

export default UserCard
