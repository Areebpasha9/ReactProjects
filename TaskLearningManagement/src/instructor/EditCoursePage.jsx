import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
import { getCourseById, updateCourse } from '../data/courses';

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = () => {
    const foundCourse = getCourseById(parseInt(id));
    setCourse(foundCourse);
    setIsLoading(false);
  };

  const handleSubmit = (courseData) => {
    setIsSubmitting(true);
    
    try {
      updateCourse(parseInt(id), courseData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Course updated successfully!');
        navigate('/instructor/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error updating course:', error);
      setIsSubmitting(false);
      alert('Failed to update course. Please try again.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      navigate('/instructor/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The course you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate('/instructor/dashboard')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">Updating your course...</p>
          </div>
        </div>
      )}
      
      <CourseForm 
        course={course}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditCoursePage;