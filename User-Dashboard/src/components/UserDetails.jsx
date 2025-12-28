import { useParams } from 'react-router-dom'
import useApi from './useApi'

function UserDetails() {
  const { id } = useParams()

  const { data: user, loading, error } = useApi(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading user details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
        
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.company?.name}</p>
        </div>

        
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Phone</span>
            <span>{user.phone}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Website</span>
            <span className="text-blue-600">{user.website}</span>
          </div>

          <div className="pt-2">
            <p className="font-medium mb-1">Address</p>
            <p className="text-sm text-gray-600">
              {user.address?.street}, {user.address?.suite},
              {user.address?.city} - {user.address?.zipcode}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserDetails
