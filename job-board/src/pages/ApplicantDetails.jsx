import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const ApplicantDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications, users } = useApp();

  const application = applications.find(
    (app) => app.id === Number(applicationId)
  );

  const user = users.find((u) => u.id === application?.userId);
  const [status, setStatus] = useState(application?.status || "PENDING");
  const [feedback, setFeedback] = useState("");

  if (!application || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <p className="text-red-500">Application not found</p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const updateStatus = (newStatus) => {
    const updatedApps = applications.map((app) =>
      app.id === application.id
        ? { ...app, status: newStatus, feedback: feedback || app.feedback }
        : app
    );

    setApplications(updatedApps);
    setStatus(newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <img
              src={user.profilePhoto || "https://via.placeholder.com/150"}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Applied for: {application.jobTitle} at {application.company}
              </p>
              <p className="text-sm text-gray-400">
                Applied on: {new Date(application.appliedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Application Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Personal Information</h3>
              <p><span className="text-gray-500">Phone:</span> {application.phone}</p>
              <p><span className="text-gray-500">Experience:</span> {application.experience} years</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {application.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Cover Letter</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {application.coverLetter}
            </p>
          </div>

          {/* Status Update */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Update Application Status</h3>
            
            {/* Feedback */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback/Notes (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add any feedback or notes for the applicant..."
              />
            </div>

            {/* Status Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => updateStatus("SHORTLISTED")}
                disabled={status === "SHORTLISTED"}
                className={`px-4 py-2 rounded-lg font-medium ${
                  status === "SHORTLISTED"
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {status === "SHORTLISTED" ? "✓ Shortlisted" : "Shortlist"}
              </button>

              <button
                onClick={() => updateStatus("REJECTED")}
                disabled={status === "REJECTED"}
                className={`px-4 py-2 rounded-lg font-medium ${
                  status === "REJECTED"
                    ? "bg-red-100 text-red-700 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {status === "REJECTED" ? "✗ Rejected" : "Reject"}
              </button>

              <button
                onClick={() => updateStatus("PENDING")}
                disabled={status === "PENDING"}
                className={`px-4 py-2 rounded-lg font-medium ${
                  status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700 cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-yellow-700"
                }`}
              >
                {status === "PENDING" ? "⏳ Pending" : "Mark as Pending"}
              </button>
            </div>

            {/* Current Status */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Current Status: <StatusBadge status={status} />
              </p>
              {application.feedback && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Feedback:</span> {application.feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
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

export default ApplicantDetails;