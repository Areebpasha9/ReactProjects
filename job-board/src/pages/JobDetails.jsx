import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { jobs } from '../data/jobs';

export default function JobDetails() {
    const { id } = useParams();
    const job = jobs.find((job) => job.id === parseInt(id));

    if (!job) {
        return <h2 className='p-6 text-red-400'>Job not found</h2>
    }
    return (
        <div className='p-6 bg-gray-200 min-h-screen mx-10'>
            <div className='bg-white shadow-lg rounded-lg p-6 mx-20'>
                <h2 className='text-2xl font-medium'>{job.title}</h2>
                <p className="text-2xl font-medium text-gray-600 mt-2">{job.company}</p>
                <p className="text-lg text-gray-7   00">{job.location}</p>
                <p className="text-green-600 font-semibold mt-3">
                    ₹ {job.salary}
                </p>
                <p className="mt-4 text-gray-700">{job.description}</p>

                <Link
                    to={`/apply/${job.id}`}
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Apply Now
                </Link>
                <div className="mt-4">
                    <Link to="/jobs" className="text-blue-600 underline">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        </div>
    )
}
