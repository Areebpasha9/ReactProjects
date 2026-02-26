import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const { currentUser, logout, applications } = useApp();
  const navigate = useNavigate();
  
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const myApps = applications.filter(
        app => app.userId === currentUser.id
      );
      // Sort by date (most recent first)
      myApps.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
      setUserApplications(myApps);
    }
  }, [currentUser, applications]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Login to View Profile</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      SHORTLISTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since: {new Date(currentUser.id).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">My Applications</h2>
          
          {userApplications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't applied for any jobs yet.</p>
              <button
                onClick={() => navigate("/jobs")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userApplications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-blue-600">
                        {app.jobTitle}
                      </h3>
                      <p className="text-gray-700">{app.company}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>📅 Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                        <span>💼 Experience: {app.experience} years</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Skills: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {app.skills?.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {app.coverLetter && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Cover Letter:</span>{" "}
                            {app.coverLetter.substring(0, 100)}...
                          </p>
                        </div>
                      )}
                      {app.feedback && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-sm">
                            <span className="font-medium">Feedback:</span>{" "}
                            {app.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;