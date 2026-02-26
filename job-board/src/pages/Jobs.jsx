import { useContext } from "react";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import { SearchContext } from "../context/SearchContext";

const Jobs = () => {
  const { searchTerm, location } = useContext(SearchContext);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 flex justify-center">
      <div className="w-full max-w-4xl">

        <h1 className="text-3xl font-bold mb-6">
          Available Jobs
        </h1>

        <p className="text-gray-600 mb-4">
          {filteredJobs.length} Jobs Found
        </p>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="bg-white p-6 rounded shadow text-center text-gray-500">
              No jobs found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Jobs;
