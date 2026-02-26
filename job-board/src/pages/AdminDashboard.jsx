import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { applications = [], jobs = [] } = useApp();

  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    totalJobs: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const totalApplications = applications.length;
    const pending = applications.filter(
      (app) => app.status === "PENDING"
    ).length;
    const shortlisted = applications.filter(
      (app) => app.status === "SHORTLISTED"
    ).length;
    const rejected = applications.filter(
      (app) => app.status === "REJECTED"
    ).length;

    setStats({
      totalApplications,
      pending,
      shortlisted,
      rejected,
      totalJobs: jobs.length,
    });

    // Get 5 most recent applications
    const recent = [...applications]
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      .slice(0, 4);
    setRecentApplications(recent);
  }, [applications, jobs]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Jobs" value={stats.totalJobs} color="blue" />
        <StatCard title="Total Applications" value={stats.totalApplications} color="purple" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Shortlisted" value={stats.shortlisted} color="green" />
        <StatCard title="Rejected" value={stats.rejected} color="red" />
      </div>

      {/* Recent Applications */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {recentApplications.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No applications yet.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
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
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{app.userName}</div>
                        <div className="text-sm text-gray-500">{app.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{app.jobTitle}</div>
                        <div className="text-sm text-gray-500">{app.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/admin/applicant/${app.id}`)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Job List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Manage Jobs</h3>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/admin/jobs/${job.id}`)}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                    <p className="text-gray-500 text-sm">{job.company}</p>
                    <p className="text-sm text-gray-400 mt-1">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {applications.filter(a => a.jobId === job.id).length} Applicants
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className={`${colors[color]} p-6 rounded-xl shadow`}>
      <p className="text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
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
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;  