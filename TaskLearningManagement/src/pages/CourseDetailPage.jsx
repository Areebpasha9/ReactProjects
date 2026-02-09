import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import {
  Star,
  Clock,
  PlayCircle,
  BookOpen,
  Award,
  Download,
  ChevronRight,
  Bookmark,
} from "lucide-react";

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id)) || courses[0];
  const progress = 37;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="mb-3 flex items-center gap-2 text-sm opacity-90">
            <Link to="/courses" className="hover:underline">
              Courses
            </Link>
            <ChevronRight size={16} />
            <span>{course.category}</span>
          </div>

          <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
          <p className="opacity-90 max-w-3xl mb-5">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center">
              <Star className="text-yellow-300 fill-current mr-2" size={18} />
              <span className="font-bold">{course.rating}</span>
            </div>

            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{course.duration}</span>
            </div>

            <span>{course.students.toLocaleString()} students</span>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              Enroll Now – ${course.price}
            </button>

            <button className="border border-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/10">
              <Bookmark size={18} /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Video */}
          <div className="bg-black rounded-xl mb-6 aspect-video flex items-center justify-center">
            <PlayCircle size={48} className="text-white opacity-80" />
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-600" />
              About this course
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              This course helps you master React fundamentals, hooks, and
              real-world best practices through hands-on learning.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              You’ll build reusable components, manage application state, and
              understand modern React project structure.
            </p>

            <h3 className="font-semibold text-lg mb-3">What you’ll learn</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
              <li>• Core React concepts & JSX</li>
              <li>• Hooks like useState & useEffect</li>
              <li>• Component-based architecture</li>
              <li>• Handling forms</li>
              <li>• State & props</li>
              <li>• Clean code practices</li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="font-bold mb-2">Your Progress</h3>

            <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
              <span>Completed</span>
              <span className="font-bold">{progress}%</span>
            </div>

            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-3 bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="font-bold mb-3">My Notes</h3>

            <textarea
              className="w-full h-32 border border-gray-300 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              placeholder="Write your notes..."
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-3">
              Save Notes
            </button>

            <button
              onClick={() => navigate(`/course/${course.id}/quiz`)}
              className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
            >
              Start Quiz
            </button>
          </div>

          {/* Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="font-bold mb-3">Resources</h3>

            <button className="w-full flex justify-between items-center border dark:border-gray-700 p-3 rounded mb-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-2">
                <Download size={18} /> Materials
              </div>
              <ChevronRight />
            </button>

            <button className="w-full flex justify-between items-center border dark:border-gray-700 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-2">
                <Award size={18} /> Certificate
              </div>
              <span className="text-green-500 font-medium">Ready</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
