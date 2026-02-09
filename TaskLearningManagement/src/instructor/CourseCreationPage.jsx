import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
        import { saveCourse } from '../data/courses';

const CourseCreationPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (courseData) => {
    setIsSubmitting(true);
    
    try {
      // Format course data with default values
      const formattedCourse = {
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        price: parseFloat(courseData.price) || 0,
        instructor: 'You', // Default instructor name
        rating: 0,
        students: 0,
        lessons: courseData.sections?.reduce((total, section) => total + (section.lessons?.length || 0), 0) || 0,
        duration: '10 hours', // Default duration
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop', // Default image
      };
      
      // Save the course
      saveCourse(formattedCourse);
      
      // Show success message
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Course created successfully! It will appear in the courses list.');
        navigate('/instructor/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('Error creating course:', error);
      setIsSubmitting(false);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      navigate('/instructor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">Creating your course...</p>
            <p className="text-gray-600 text-sm">Please wait a moment</p>
          </div>
        </div>
      )}
      
      <CourseForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CourseCreationPage;