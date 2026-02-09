import { Link } from 'react-router-dom';
import { Star, Users, Clock, PlayCircle } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            Featured
          </span>
        )}
        <div className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg">
          <PlayCircle size={20} className="text-blue-600" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            {course.category}
          </span>
          <span className="text-2xl font-bold text-gray-900">${course.price}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current mr-1" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="text-gray-900 font-medium">
            {course.lessons} lessons
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-sm font-medium text-gray-700">
                {course.instructor.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-gray-700">{course.instructor}</span>
          </div>
          
          <Link
            to={`/course/${course.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;