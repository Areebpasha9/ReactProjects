import { useState } from 'react'
import './App.css'
import Header from './components/header'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import UserList from './components/UserList'
import AddUser from './components/AddUser'
import UserDetails from './components/UserDetails'

function App() {
  const [users, setUsers] = useState([])

  const addUser = (newUser) => {

    const tempId = Date.now();
    const userWithId = { ...newUser, id: tempId }

    setUsers(prevUsers => [...prevUsers, userWithId])
    return tempId;
  }

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <main className='container mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UserList users={users} />} />
            <Route path='/add-user' element={<AddUser  addUser={addUser}/>} />
            <Route path='/users/:id' element={<UserDetails />} />
          </Routes>

        </main>
      </div>
    </>
  )
}

export default App
