import { useState, useEffect } from 'react';
import {
  BookOpen, Users, TrendingUp, DollarSign,
  Plus, Edit, Eye, BarChart3, Clock, Star,
  Trash2, AlertTriangle, RotateCcw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAllCourses,
  deleteCourse,
  restoreCourse,
  getDeletedCourses
} from '../data/courses';
import { showToast } from '../utils';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showRestoreSection, setShowRestoreSection] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('all');

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const allCourses = getAllCourses();
    const deleted = getDeletedCourses();
    setCourses(allCourses);
    setDeletedCourses(deleted);
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    if (filter === 'my') {
      return course.instructor === "You";
    } else if (filter === 'default') {
      return course.id <= 6;
    }
    return true;
  });

  const handleDeleteClick = (courseId, courseTitle, isDefault = false) => {
    setShowDeleteConfirm({
      courseId,
      courseTitle,
      isDefault: isDefault || (courseId >= 1 && courseId <= 6)
    });
  };

  const handleConfirmDelete = async () => {
    if (!showDeleteConfirm) return;

    setIsDeleting(true);
    try {
      const success = deleteCourse(showDeleteConfirm.courseId);

      if (success) {
        loadCourses(); // Refresh the list
        alert(showDeleteConfirm.isDefault
          ? 'Course hidden successfully! You can restore it from the deleted section.'
          : 'Course deleted successfully!');
      } else {
        // alert('Failed to delete course. Please try again.');
        showToast("Failed to delete course. Please try again.","warning");
      }
    } catch (error) {
      console.error('Delete error:', error);
      // alert('Error deleting course. Please try again.');
      showToast("Error deleting course. Please try again.","warning")
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
    }
  };

  const handleRestoreCourse = (courseId, courseTitle) => {
    if (restoreCourse(courseId)) {
      loadCourses();
      // alert(`Course "${courseTitle}" restored successfully!`);
      showToast(`Course "${courseTitle}" restored successfully!`, "success");

    }
  };

  // Calculate stats
  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      change: "+2"
    },
    {
      label: "Total Students",
      value: courses.reduce((sum, course) => sum + (course.students || 0), 0).toLocaleString(),
      icon: Users,
      change: "+12%"
    },
    {
      label: "Total Revenue",
      value: `$${courses.reduce((sum, course) => sum + ((course.price || 0) * (course.students || 0)), 0).toLocaleString()}`,
      icon: DollarSign,
      change: "+18%"
    },
    {
      label: "Avg Rating",
      value: courses.length > 0
        ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1)
        : "0.0",
      icon: Star,
      change: "+0.2"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-bold text-gray-900">
                {showDeleteConfirm.isDefault ? 'Hide Course' : 'Delete Course'}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {showDeleteConfirm.isDefault ? (
                <>
                  This is a default course. It will be <strong>hidden from view</strong>
                  but can be restored later from the deleted section.
                  <br /><br />
                  Are you sure you want to hide <strong>"{showDeleteConfirm.courseTitle}"</strong>?
                </>
              ) : (
                <>
                  Are you sure you want to delete <strong>"{showDeleteConfirm.courseTitle}"</strong>?
                  This action cannot be undone and will remove the course permanently.
                </>
              )}
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`px-4 py-2 rounded-lg text-white ${showDeleteConfirm.isDefault ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'} disabled:opacity-50`}
                disabled={isDeleting}
              >
                {isDeleting ? 'Processing...' : (showDeleteConfirm.isDefault ? 'Hide Course' : 'Delete Course')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage courses and track performance</p>
        </div>
        <div className="flex space-x-3">
          {deletedCourses.length > 0 && (
            <button
              onClick={() => setShowRestoreSection(!showRestoreSection)}
              className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              <RotateCcw size={18} className="mr-2" />
              {showRestoreSection ? 'Hide Deleted' : `Deleted (${deletedCourses.length})`}
            </button>
          )}
          <Link
            to="/instructor/course/new"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" /> Create New Course
          </Link>


        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilter('my')}
            className={`px-4 py-2 rounded-lg ${filter === 'my' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            My Courses ({courses.filter(c => c.instructor === "You").length})
          </button>
          <button
            onClick={() => setFilter('default')}
            className={`px-4 py-2 rounded-lg ${filter === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Default Courses ({courses.filter(c => c.id <= 6).length})
          </button>
        </div>
      </div>

      {/* Deleted Courses Restore Section */}
      {showRestoreSection && deletedCourses.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-yellow-800">
              <AlertTriangle className="inline h-5 w-5 mr-2" />
              Hidden Default Courses ({deletedCourses.length})
            </h3>
            <button
              onClick={() => setShowRestoreSection(false)}
              className="text-yellow-700 hover:text-yellow-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deletedCourses.map(course => (
              <div key={course.id} className="bg-white p-4 rounded-lg border border-yellow-100">
                <div className="flex items-start mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.category}</p>
                    <p className="text-xs text-yellow-600 mt-1">Default Course ID: {course.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRestoreCourse(course.id, course.title)}
                  className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <RotateCcw size={14} className="mr-2" />
                  Restore Course
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Courses Management</h2>
            <p className="text-gray-600 text-sm mt-1">
              {filter === 'all' && 'All available courses'}
              {filter === 'my' && 'Courses created by you'}
              {filter === 'default' && 'Default platform courses'}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Course</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Instructor</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Students</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => {
                  const isDefaultCourse = course.id >= 1 && course.id <= 6;
                  const isMyCourse = course.instructor === "You";

                  return (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{course.title}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.lessons || 0} lessons • {course.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {course.instructor}
                          {isMyCourse && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{(course.students || 0).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-green-600">
                          ${((course.price || 0) * (course.students || 0)).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{course.rating || 'New'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDefaultCourse
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                          }`}>
                          {isDefaultCourse ? 'Default' : 'My Course'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                            onClick={() => navigate(`/instructor/course/edit/${course.id}`)}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="View"
                            onClick={() => navigate(`/course/${course.id}`)}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${isDefaultCourse
                              ? 'text-orange-600 hover:bg-orange-50'
                              : 'text-red-600 hover:bg-red-50'
                              }`}
                            title={isDefaultCourse ? "Hide Course" : "Delete Course"}
                            onClick={() => handleDeleteClick(course.id, course.title, isDefaultCourse)}
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                            title="Create Quiz"
                            onClick={() => navigate(`/instructor/course/${course.id}/quiz`)}
                          >
                            Create Quiz
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium">No courses found</p>
                    <p className="text-sm mt-1">
                      {filter === 'my'
                        ? "You haven't created any courses yet."
                        : "No courses match your current filter."}
                    </p>
                    {filter === 'my' && (
                      <Link
                        to="/instructor/course/new"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Create Your First Course
                      </Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow text-white p-6">
          <h3 className="font-bold mb-2">Engagement Rate</h3>
          <p className="text-3xl font-bold mb-2">87%</p>
          <p className="text-blue-100">Students completing courses</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow text-white p-6">
          <h3 className="font-bold mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold mb-2">$14,250</p>
          <p className="text-green-100">Last 30 days</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow text-white p-6">
          <h3 className="font-bold mb-2">Student Satisfaction</h3>
          <p className="text-3xl font-bold mb-2">96%</p>
          <p className="text-purple-100">Positive feedback</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;