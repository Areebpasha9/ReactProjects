import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Apply from './pages/Apply'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashBoard'
import JobApplicants from './pages/JobApplicants'
import ApplicantDetails from './pages/ApplicantDetails'
import ProtectedRoute from './pages/ProtectdRoute'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route
          path="admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/jobs/:jobId"
          element={
            <ProtectedRoute role="ADMIN">
              <JobApplicants />
            </ProtectedRoute>
          }
        />
        
        <Route
          path='/admin/applicant/:applicationId'
          element={
            <ProtectedRoute role="ADMIN">
              <ApplicantDetails />
            </ProtectedRoute>
          }
        />

        <Route path='/' element={<Home />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App