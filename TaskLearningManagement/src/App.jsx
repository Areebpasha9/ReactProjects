import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import InstructorDashboard from './instructor/InstructorDashboard'
import AdminDashboard from './admin/AdminDashboard';
import CourseCreationPage from './instructor/CourseCreationPage';
import EditCoursePage from './instructor/EditCoursePage';
import QuizBuilder from './instructor/QuizBuilder'
import QuizAttempt from './pages/QuizAttempt'
import { initTheme } from './theme'
import { useEffect } from 'react'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  const { user, logout } = useAuth()

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-8 max-w-7xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
                  <p className="text-gray-600">
                    Welcome back, {user?.name}! You are logged in as {user?.role}.
                  </p>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="p-8 max-w-7xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
                  <div className="bg-white rounded-xl shadow p-6 max-w-md">
                    <div className="flex items-center mb-6">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mt-1 inline-block">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >Logout </button>
                  </div>  </div>
              </ProtectedRoute>} />
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>} />

          <Route
            path="/instructor/course/new"
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <CourseCreationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/course/edit/:id"
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <CourseCreationPage />
              </ProtectedRoute>} />

          <Route
            path="/instructor/course/edit/:id"
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <EditCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:courseId/quiz"
            element={<QuizBuilder />}
          />
          <Route
            path="/course/:courseId/quiz"
            element={<QuizAttempt />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App