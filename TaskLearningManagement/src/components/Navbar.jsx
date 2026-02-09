import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Home, BookOpen, User, LogOut, Bell, ChevronDown, BookText, Users, Settings, GraduationCap,
  BarChart3, Moon, Sun
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toggleTheme } from '../theme';

const Navbar = () => {
  const { user, logout, isAuthenticated, isInstructor, isAdmin } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, text: 'New student enrolled in your course', time: '2 hours ago' },
    { id: 2, text: 'Your course was approved', time: '1 day ago' },
  ])

  const handleLogout = () => {
    console.log('Logging out...')
    logout()
    setDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-menu')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dropdownOpen])
  
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleThemeToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };


  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden md:inline">LMS Platform</span>
            <span className="text-xl font-bold text-gray-900 md:hidden">LMS</span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
            >
              <Home className="h-5 w-5 mr-2" /> Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" /> Courses
            </Link>


            {/* Instructor Links */}
            {(isInstructor || isAdmin) && (
              <Link
                to="/instructor/dashboard"
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
              >
                <BookText className="h-5 w-5 mr-2" /> Instructor
              </Link>
            )}

            {/* Admin Links */}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
              >
                <Settings className="h-5 w-5 mr-2" /> Admin
              </Link>
            )}

            {/* Dashboard Link for all authenticated users */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
              >
                <BarChart3 className="h-5 w-5 mr-2" /> Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell with Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleThemeToggle}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    {isDark ? <Sun /> : <Moon />}
                  </button>
                  <button className="relative p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-300">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200 hidden">
                    <div className="px-4 py-3 border-b">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-600">{notifications.length} unread</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b">
                          <p className="text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      className="block px-4 py-3 text-center text-blue-600 hover:bg-gray-50 border-t"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative user-menu">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="ml-3">
                            <p className="font-bold text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                              {user?.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Links */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                          <BarChart3 className="h-5 w-5 mr-3 text-gray-500" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-5 w-5 mr-3 text-gray-500" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/my-courses"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                          <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                          <span>My Courses</span>
                        </Link>
                      </div>

                      {/* Instructor Section */}
                      {(isInstructor || isAdmin) && (
                        <div className="border-t py-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Instructor
                          </div>
                          <Link
                            to="/instructor/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                          >
                            <BookText className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Instructor Dashboard</span>
                          </Link>
                          <Link
                            to="/instructor/courses"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                          >
                            <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                            <span>My Courses</span>
                          </Link>
                          <Link
                            to="/instructor/students"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                          >
                            <Users className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Students</span>
                          </Link>
                        </div>
                      )}

                      {/* Admin Section */}
                      {isAdmin && (
                        <div className="border-t py-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Admin
                          </div>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                          >
                            <Settings className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Admin Dashboard</span>
                          </Link>
                          <Link
                            to="/admin/users"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                          >
                            <Users className="h-5 w-5 mr-3 text-gray-500" />
                            <span>User Management</span>
                          </Link>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="border-t my-2"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Mobile Menu for non-authenticated */}
                <div className="md:hidden">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2"
                  >
                    Login
                  </Link>
                </div>

                {/* Desktop buttons for non-authenticated */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation (for non-authenticated users) */}
      {!isAuthenticated && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="px-4 py-3 flex justify-around">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">Courses</span>
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar