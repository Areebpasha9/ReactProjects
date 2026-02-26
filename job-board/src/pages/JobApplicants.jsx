import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { jobs } from "../data/jobs";

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { applications } = useApp();
  
  const [filteredApps, setFilteredApps] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const job = jobs.find(j => j.id === Number(jobId));

  useEffect(() => {
    let filtered = applications.filter(
      (app) => app.jobId === Number(jobId)
    );

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    
    setFilteredApps(filtered);
  }, [applications, jobId, statusFilter]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <p className="text-red-500">Job not found</p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const stats = {
    total: filteredApps.length,
    pending: filteredApps.filter(a => a.status === "PENDING").length,
    shortlisted: filteredApps.filter(a => a.status === "SHORTLISTED").length,
    rejected: filteredApps.filter(a => a.status === "REJECTED").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin")}
            className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>
            
            {/* Stats for this job */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <StatBox label="Total" value={stats.total} color="blue" />
              <StatBox label="Pending" value={stats.pending} color="yellow" />
              <StatBox label="Shortlisted" value={stats.shortlisted} color="green" />
              <StatBox label="Rejected" value={stats.rejected} color="red" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === "ALL"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("PENDING")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === "PENDING"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("SHORTLISTED")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === "SHORTLISTED"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Shortlisted
          </button>
          <button
            onClick={() => setStatusFilter("REJECTED")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === "REJECTED"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Applicants List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {filteredApps.length === 0 ? (
            <p className="p-8 text-center text-gray-500">
              No applicants found for this job.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{app.userName}</div>
                        <div className="text-sm text-gray-500">{app.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.experience} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/admin/applicant/${app.id}`)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View & Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className={`${colors[color]} p-3 rounded-lg text-center`}>
      <p className="text-xs">{label}</p>
      <p className="text-lg font-bold">{value}</p>
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

export default JobApplicants;