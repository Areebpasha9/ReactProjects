import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const JobCard = ({ job }) => {
  const { applications, setApplications, currentUser } = useApp();

  const isApplied = applications.some(
    (app) =>
      app.jobId === job.id &&
      app.userId === currentUser?.id
  );

  const applyJob = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    if (isApplied) return;

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      userId: currentUser.id,
      status: "APPLIED",
    };

    setApplications([...applications, newApplication]);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-300"
     onClick={() => navigate(`/job/${job.id}`)}>

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {job.title}
          </h2>

          <p className="text-gray-700 font-medium mt-1">
            {job.company}
            <span className="text-yellow-500 ml-2">★ 2.8</span>
            <span className="text-gray-500 ml-1 text-sm">
              | 14 Reviews
            </span>
          </p>
        </div>

        {/* Logo Placeholder */}
        <div className="w-12 h-12 bg-red-100 text-red-500 flex items-center justify-center rounded-xl font-bold text-lg">
          {job.company?.charAt(0)}
        </div>

      </div>

      {/* Info Row */}
      <div className="flex flex-wrap gap-6 mt-4 text-gray-600 text-lg">
        <div>💼 {job.experience || "0-5 Yrs"}</div>
        <div>💰 {job.salary}</div>
        <div>📍 {job.location}</div>
      </div>

      {/* Skills */}
      {job.skills && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-5">

        <p className="text-xs text-gray-400">
          2 days ago
        </p>

        <button
          onClick={applyJob}
          disabled={isApplied}
          className={`px-4 py-1.5 rounded-lg text-sm text-white transition ${isApplied
              ? "bg-green-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isApplied ? "Applied ✓" : "Apply"}
        </button>

      </div>

    </div>
  );
};

export default JobCard;
