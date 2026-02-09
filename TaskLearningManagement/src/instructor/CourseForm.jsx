import { useState } from "react";
import {
  Upload, X, Tag, Calendar,
  DollarSign, Globe, Lock, Save
} from "lucide-react";

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    price: course?.price || 0,
    level: course?.level || "beginner",
    language: course?.language || "english",
    access: course?.access || "public",
    image: course?.image || ""
  });

  const categories = [
    "Web Development", "Data Science", "Mobile Development",
    "Design", "Business", "Marketing", "Personal Development"
  ];

  const levels = ["beginner", "intermediate", "advanced"];
  const languages = ["english", "spanish", "french"];
  const accessTypes = ["public", "private"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const completeCourseData = {
      ...formData,
      instructor: "You",
      rating: 0,
      students: 0,
      lessons: 0,
      duration: "10 hours",
      featured: false
    };

    onSubmit(completeCourseData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            {course ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the basic details to create your course
          </p>
        </div>

        <button
          onClick={onCancel}
          className="flex items-center px-4 py-2 border border-gray-300
            dark:border-gray-700 rounded-lg
            hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Course Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-6 dark:text-white">
            Course Information
          </h2>

          <div className="space-y-6">

            {/* Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Course Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-3 rounded-lg border
                  bg-white dark:bg-gray-900
                  border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Course Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 h-40 rounded-lg border
                  bg-white dark:bg-gray-900
                  border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            {/* Category & Level */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Category *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full pl-12 p-3 rounded-lg appearance-none
                      bg-white dark:bg-gray-900
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-gray-100"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Difficulty Level *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full pl-12 p-3 rounded-lg appearance-none
                      bg-white dark:bg-gray-900
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-gray-100"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Language & Access */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full pl-12 p-3 rounded-lg appearance-none
                      bg-white dark:bg-gray-900
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-gray-100"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Access Type
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.access}
                    onChange={(e) =>
                      setFormData({ ...formData, access: e.target.value })
                    }
                    className="w-full pl-12 p-3 rounded-lg appearance-none
                      bg-white dark:bg-gray-900
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-gray-100"
                  >
                    {accessTypes.map(a => (
                      <option key={a} value={a}>
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Price ($)
              </label>
              <div className="relative max-w-xs">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full pl-12 p-3 rounded-lg
                    bg-white dark:bg-gray-900
                    border border-gray-300 dark:border-gray-700
                    text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Course Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full p-3 rounded-lg
                  bg-white dark:bg-gray-900
                  border border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 dark:border-gray-700
              rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-8 py-3
              bg-blue-600 dark:bg-blue-500 text-white
              rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            <Save className="h-5 w-5 mr-2" />
            {course ? "Update Course" : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
