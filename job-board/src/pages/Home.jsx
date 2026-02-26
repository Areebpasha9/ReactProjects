import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";

const Home = () => {
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-28 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies.
          Apply easily and take the next step in your career.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>

          <Link
            to="/profile"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition"
          >
            Create Profile
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-4xl font-bold text-blue-600">10K+</h2>
            <p className="mt-2 text-gray-600">Active Jobs</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-4xl font-bold text-blue-600">5K+</h2>
            <p className="mt-2 text-gray-600">Companies</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-4xl font-bold text-blue-600">25K+</h2>
            <p className="mt-2 text-gray-600">Successful Hires</p>
          </div>

        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Jobs
          </h2>

          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="block border rounded-lg p-5 hover:shadow-md hover:border-blue-500 transition"
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {job.title}
                </h3>
                <p className="text-gray-700">{job.company}</p>
                <p className="text-sm text-gray-500">
                  📍 {job.location} • 💰 ₹ {job.salary}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/jobs"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Take the Next Step?
        </h2>

        <p className="mt-4 text-blue-100">
          Create your profile and start applying today.
        </p>

        <Link
          to="/profile"
          className="mt-6 inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobBoard. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
