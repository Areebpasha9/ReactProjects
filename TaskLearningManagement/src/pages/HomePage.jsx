import { Link } from "react-router-dom";
import { PlayCircle, Users, Award, Clock } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <PlayCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Interactive Videos",
      description: "Learn with high-quality videos and built-in quizzes."
    },
    { 
      icon: <Users className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Expert Instructors",
      description: "Learn from industry experts with real-world experience."
    },
    {
      icon: <Award className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Certification",
      description: "Get certificates recognized by top companies."
    },
    {
      icon: <Clock className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Self-Paced Learning",
      description: "Study anytime with lifetime course access."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 dark:text-gray-100">

      {/* Hero */}
      <section className="text-center py-24 px-6 
        bg-gradient-to-b from-indigo-50 to-white 
        dark:from-gray-800 dark:to-gray-900">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Learn Without
          <span className="text-indigo-600 dark:text-indigo-400"> Limits</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Join thousands of learners mastering new skills on our platform.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/courses"
            className="px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-medium shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Browse Courses
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 border-2 border-indigo-600 dark:border-indigo-400 
              text-indigo-600 dark:text-indigo-400 
              rounded-xl font-medium 
              hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center 
                shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10K+", "Students"],
            ["500+", "Courses"],
            ["200+", "Instructors"],
            ["98%", "Satisfaction"]
          ].map(([value, label], i) => (
            <div
              key={i}
              className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-6"
            >
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
                {value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center 
        bg-gradient-to-t from-indigo-50 to-white 
        dark:from-gray-800 dark:to-gray-900">
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Start Learning?
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Join our community and upgrade your career today.
        </p>

        <Link
          to="/signup"
          className="px-10 py-4 bg-indigo-600 dark:bg-indigo-500 text-white 
            rounded-xl font-semibold shadow 
            hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
