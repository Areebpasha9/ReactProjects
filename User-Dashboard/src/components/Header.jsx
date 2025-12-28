import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <header className='bg-gray-400'>
                <nav>
                    <div className=' flex justify-between text-center h-15 p-2 '>
                        <Link to='/' className='text-2xl font-bold text-blue-600'>UserDash</Link>
                  
                    <div className='flex gap-5'>
                        <Link to='/' className='text-gray-700 hover:text-blue-800 font-medium'>Home</Link>
                        <Link to='/users'
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >Users</Link>
                        <Link to='/add-user'
                            className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 h-9 mt-1"
                        >
                            Add User</Link>
                    </div>
                      </div>
                </nav>
            </header>
        </>
    )
}

export default Header
