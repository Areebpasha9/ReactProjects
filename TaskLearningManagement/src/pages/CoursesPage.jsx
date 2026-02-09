import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { getAllCourses, getCategories } from '../data/courses'; // Updated import

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setIsLoading(true);
    const allCourses = getAllCourses();
    const allCategories = getCategories();
    
    setCourses(allCourses);
    setCategories(allCategories);
    setIsLoading(false);
  };

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.students - a.students;
      case 'rating': return b.rating - a.rating;
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default: return 0;
    }
  });

  // Add "newest" option to sort
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
        <p className="text-gray-600">
          Discover {courses.length} courses from expert instructors
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses, instructors, topics..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort By */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      ) : (
        <>
          {/* Results Info */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
              {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Courses Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow p-6 flex items-center">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-32 h-32 object-cover rounded-lg mr-6" 
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        ★ {course.rating || 'New'}
                      </span>
                      <span>{course.students?.toLocaleString() || 0} students</span>
                      <span>{course.duration}</span>
                      <span className="font-bold text-gray-900">${course.price || 0}</span>
                      {course.createdAt && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Course
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No courses found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;