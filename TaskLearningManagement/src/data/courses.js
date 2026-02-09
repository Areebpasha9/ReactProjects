// Default mock courses
const defaultCourses = [
  {
    id: 1,
    title: "React Masterclass 2024",
    instructor: "John Doe",
    category: "Web Development",
    rating: 4.8,
    students: 12500,
    price: 89.99,
    duration: "42 hours",
    lessons: 156,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    description: "Learn React from basics to advanced concepts with hands-on projects",
    featured: true,
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Jane Smith",
    category: "Data Science",
    rating: 4.6,
    students: 8900,
    price: 74.99,
    duration: "36 hours",
    lessons: 128,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    description: "Complete Python and data analysis course with real-world datasets",
    featured: false,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Johnson",
    category: "Design",
    rating: 4.9,
    students: 5600,
    price: 59.99,
    duration: "28 hours",
    lessons: 94,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
    description: "Master user interface and experience design principles",
    featured: true,
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    instructor: "Dr. Sarah Wilson",
    category: "AI & ML",
    rating: 4.7,
    students: 13400,
    price: 99.99,
    duration: "48 hours",
    lessons: 182,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    description: "Introduction to machine learning algorithms and applications",
    featured: false,
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    instructor: "Mike Chen",
    category: "Web Development",
    rating: 4.5,
    students: 7800,
    price: 119.99,
    duration: "60 hours",
    lessons: 210,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
    description: "Become a full-stack developer with MERN stack",
    featured: false,
  },
  {
    id: 6,
    title: "Digital Marketing Strategy",
    instructor: "Emily Davis",
    category: "Marketing",
    rating: 4.4,
    students: 4500,
    price: 49.99,
    duration: "24 hours",
    lessons: 86,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    description: "Learn modern digital marketing techniques and tools",
    featured: false,
  },
];

// Track deleted courses
let deletedCourseIds = JSON.parse(localStorage.getItem('deleted_courses') || '[]');

// Save deleted courses to localStorage
const saveDeletedCourses = () => {
  localStorage.setItem('deleted_courses', JSON.stringify(deletedCourseIds));
};

// Get all courses (default + instructor-created, excluding deleted)
export const getAllCourses = () => {
  try {
    // Get instructor-created courses
    const storedCourses = localStorage.getItem('instructor_courses');
    const instructorCourses = storedCourses ? JSON.parse(storedCourses) : [];
    
    // Filter default courses - exclude deleted ones
    const filteredDefaultCourses = defaultCourses.filter(course => 
      !deletedCourseIds.includes(course.id)
    );
    
    // Combine both
    const allCourses = [...filteredDefaultCourses, ...instructorCourses];
    
    // Remove duplicates
    const uniqueCourses = allCourses.filter((course, index, self) =>
      index === self.findIndex((c) => c.id === course.id)
    );

    return uniqueCourses;
  } catch (error) {
    console.error('Error loading courses:', error);
    return defaultCourses.filter(course => !deletedCourseIds.includes(course.id));
  }
};

// Get categories
export const getCategories = () => {
  const courses = getAllCourses();
  const categories = ['All', ...new Set(courses.map(course => course.category).filter(Boolean))];
  return categories;
};

// Save a new course
export const saveCourse = (courseData) => {
  try {
    const courses = JSON.parse(localStorage.getItem('instructor_courses') || '[]');
    
    const newCourse = {
      id: Date.now(),
      title: courseData.title || "Untitled Course",
      description: courseData.description || "No description",
      category: courseData.category || "Uncategorized",
      price: parseFloat(courseData.price) || 0,
      instructor: "You",
      rating: 0,
      students: 0,
      lessons: courseData.lessons || 0,
      duration: courseData.duration || "10 hours",
      image: courseData.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      featured: false,
      createdAt: new Date().toISOString(),
      canDelete: true, // Mark as deletable
    };
    
    courses.push(newCourse);
    localStorage.setItem('instructor_courses', JSON.stringify(courses));
    return newCourse;
  } catch (error) {
    console.error('Error saving course:', error);
    throw error;
  }
};

// Get course by ID
export const getCourseById = (id) => {
  const allCourses = getAllCourses();
  const courseId = typeof id === 'string' ? parseInt(id) : id;
  return allCourses.find(course => course.id === courseId);
};

// Delete a course 
export const deleteCourse = (courseId) => {
  try {
    // Check if it's a default course
    const isDefaultCourse = courseId >= 1 && courseId <= 6;
    
    if (isDefaultCourse) {
      // Add to deleted list (hide it)
      if (!deletedCourseIds.includes(courseId)) {
        deletedCourseIds.push(courseId);
        saveDeletedCourses();
      }
      return true;
    } else {
      //delete from localStorage
      const courses = JSON.parse(localStorage.getItem('instructor_courses') || '[]');
      const initialLength = courses.length;
      const filteredCourses = courses.filter(course => course.id !== courseId);
      
      if (filteredCourses.length < initialLength) {
        localStorage.setItem('instructor_courses', JSON.stringify(filteredCourses));
        return true;
      }
      return false;
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    return false;
  }
};

// Restore a deleted default course
export const restoreCourse = (courseId) => {
  try {
    const index = deletedCourseIds.indexOf(courseId);
    if (index !== -1) {
      deletedCourseIds.splice(index, 1);
      saveDeletedCourses();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring course:', error);
    return false;
  }
};

// Get deleted courses
export const getDeletedCourses = () => {
  return defaultCourses.filter(course => deletedCourseIds.includes(course.id));
};

// Check if course can be deleted (instructor-created courses only)
export const canDeleteCourse = (courseId) => {
  // Default courses can be "deleted" (hidden)
  // Instructor courses can be deleted
  return true; // All courses can be deleted/hidden
};

// For backward compatibility
export const courses = getAllCourses();
export const categories = getCategories();

// Update course
export const updateCourse = (courseId, updatedData) => {
  try {
    const courses = JSON.parse(localStorage.getItem('instructor_courses') || '[]');
    const index = courses.findIndex(course => course.id === courseId);
    
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updatedData, updatedAt: new Date().toISOString() };
      localStorage.setItem('instructor_courses', JSON.stringify(courses));
      return courses[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};