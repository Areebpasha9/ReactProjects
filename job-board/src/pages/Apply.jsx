import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { jobs } from "../data/jobs";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, applications, setApplications } = useApp();
  
  const job = jobs.find((job) => job.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    experience: "",
    skills: "",
    coverLetter: "",
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Login to Apply</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!job) {
    return <h2 className="p-6 text-red-400">Job not found</h2>;
  }

  // Check if already applied
  const hasApplied = applications.some(
    (app) => app.jobId === job.id && app.userId === currentUser.id
  );

  if (hasApplied) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Already Applied!
          </h2>
          <p className="text-gray-600 mb-6">
            You have already applied for {job.title} at {job.company}
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse More Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      phone: formData.phone,
      experience: formData.experience,
      skills: formData.skills.split(",").map(s => s.trim()),
      coverLetter: formData.coverLetter,
      appliedDate: new Date().toISOString(),
      status: "PENDING", // PENDING, SHORTLISTED, REJECTED
    };

    setApplications([...applications, newApplication]);
    
    // Show success message and redirect
    alert("Application submitted successfully!");
    navigate("/profile");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Apply for {job.title}</h1>
          <p className="text-gray-600 mb-6">{job.company} • {job.location}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                placeholder="React, JavaScript, Node.js"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Why are you a good fit for this role?"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => navigate(`/job/${job.id}`)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;