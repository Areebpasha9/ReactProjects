import { useState } from 'react';
import {   Users, BookOpen, CheckCircle, AlertCircle,TrendingUp,  DollarSign, BarChart,Shield,UserCheck,
  XCircle,MoreVertical,Download,Filter,Settings
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data
  const [pendingCourses] = useState([
    { 
      id: 101, 
      title: "Advanced JavaScript Patterns", 
      instructor: "John Doe", 
      category: "Web Development", 
      submitted: "2024-03-10", 
      status: "pending",
      students: 0
    },
    { 
      id: 102, 
      title: "UX Research Methods", 
      instructor: "Alex Johnson", 
      category: "Design", 
      submitted: "2024-03-12", 
      status: "pending",
      students: 0
    }
  ]);

  const [recentUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "student", status: "active", joined: "2024-03-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "instructor", status: "pending", joined: "2024-03-14" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "student", status: "active", joined: "2024-03-13" },
    { id: 4, name: "David Wilson", email: "david@example.com", role: "admin", status: "active", joined: "2024-03-12" },
  ]);

  const dashboardStats = [
    { label: "Total Users", value: "1,254", icon: Users, color: "blue", change: "+12%" },
    { label: "Total Courses", value: "342", icon: BookOpen, color: "green", change: "+8%" },
    { label: "Pending Approval", value: pendingCourses.length, icon: AlertCircle, color: "orange", change: "-2" },
    { label: "Active Today", value: "487", icon: TrendingUp, color: "purple", change: "+5%" },
    { label: "Monthly Revenue", value: "$24,589", icon: DollarSign, color: "emerald", change: "+18%" },
    { label: "Avg. Completion", value: "68%", icon: BarChart, color: "pink", change: "+3%" }
  ];

  // Helper function to get color classes
  const getColorClass = (color, type) => {
    const colorClasses = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-600' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-600' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-600' }
    };
    return colorClasses[color]?.[type] || '';
  };

  const handleApproveCourse = (courseId) => {
    console.log('Approved course:', courseId);
    alert(`Course ${courseId} approved!`);
  };

  const handleRejectCourse = (courseId) => {
    console.log('Rejected course:', courseId);
    alert(`Course ${courseId} rejected!`);
  };

  const handleApproveUser = (userId) => {
    console.log('Approved user:', userId);
    alert(`User ${userId} approved!`);
  };

  const handleSuspendUser = (userId) => {
    console.log('Suspended user:', userId);
    alert(`User ${userId} suspended!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid - FIXED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClass(stat.color, 'bg')}`}>
                <stat.icon className={`h-6 w-6 ${getColorClass(stat.color, 'text')}`} />
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Pending Courses Approval */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Pending Course Approvals</h2>
              <p className="text-sm text-gray-600">Courses waiting for review</p>
            </div>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="p-6">
            {pendingCourses.length > 0 ? (
              <div className="space-y-4">
                {pendingCourses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600">By {course.instructor}</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        {course.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{course.category}</span>
                      <span>Submitted: {course.submitted}</span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApproveCourse(course.id)}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectCourse(course.id)}
                        className="flex-1 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">All courses have been reviewed!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Recent Users</h2>
              <p className="text-sm text-gray-600">New registrations</p>
            </div>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">User</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Role</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700'
                            : user.role === 'instructor'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          {user.status === 'pending' && (
                            <button
                              onClick={() => handleApproveUser(user.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Approve User"
                            >
                              <UserCheck size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Suspend User"
                          >
                            <Shield size={16} />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all users →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="bg-white rounded-xl shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Platform Statistics</h2>
          <p className="text-sm text-gray-600">Monthly overview</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">3,245</div>
              <p className="text-gray-600">Monthly Enrollments</p>
              <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15% from last month
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">2,178</div>
              <p className="text-gray-600">Course Completions</p>
              <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% from last month
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <p className="text-gray-600">User Satisfaction</p>
              <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2% from last month
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">42</div>
              <p className="text-gray-600">New Instructors</p>
              <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5 from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - FIXED: Settings icon now imported */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow text-white p-6">
          <Shield className="h-10 w-10 mb-4" />
          <h3 className="font-bold mb-2">User Management</h3>
          <p className="text-blue-100 mb-4">Manage all users and permissions</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50">
            Go to Users
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow text-white p-6">
          <BookOpen className="h-10 w-10 mb-4" />
          <h3 className="font-bold mb-2">Course Management</h3>
          <p className="text-green-100 mb-4">Approve and manage all courses</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50">
            Manage Courses
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow text-white p-6">
          <BarChart className="h-10 w-10 mb-4" />
          <h3 className="font-bold mb-2">Reports & Analytics</h3>
          <p className="text-purple-100 mb-4">Detailed platform analytics</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">
            View Reports
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow text-white p-6">
          <Settings className="h-10 w-10 mb-4" /> {/* This was causing the error! */}
          <h3 className="font-bold mb-2">System Settings</h3>
          <p className="text-orange-100 mb-4">Configure platform settings</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;