import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="py-12 px4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Welcome to User DashBoard</h1>
                <p>User management DB</p>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                        <div className="text-gray-700">Users</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-green-600 mb-2">Easy</div>
                        <div className="text-gray-700">Management</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="text-3xl font-bold text-purple-600 mb-2">Real</div>
                        <div className="text-gray-700">API Data</div>
                    </div>
                </div>
                <div className='flex gap-4 justify-center'>
                    <Link to='/users' className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium'>View Users</Link>
                    <Link to='/add-user' className='bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-medium'>Add User</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
