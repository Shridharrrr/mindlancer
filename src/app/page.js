"use client";

import { useEffect, useState } from "react";
import { getJobs, getBusinessById } from "@/services/services";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const response = await getJobs(); // Fetch jobs from Firestore
    
        if (response.success) {
          let jobsWithCompany = await Promise.all(
            response.jobs.map(async (job) => {
              if (job.business_id) {
                const businessData = await getBusinessById(job.business_id); // Fetch business details
                return { ...job, companyName: businessData?.companyName || "Unknown Company" }; // Merge data
              }
              return job;
            })
          );
    
          setJobs(jobsWithCompany); // Update state with jobs that now include company names
        } else {
          setError(response.error);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Jobs</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 overflow-y-auto max-h-[500px] p-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Company: {job.companyName}
              </p>

              {/* Job Description */}
              <p className="mt-2 text-gray-700 text-sm">{job.description}</p>

              {/* Skills Required */}
              <div className="mt-3">
                <h4 className="text-gray-800 text-sm font-medium">
                  Skills Required:
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {job.skills_required.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Budget & Payment Type */}
              <div className="mt-4">
                <p className="text-gray-800 text-sm font-medium">
                  💰 Budget: <span className="text-blue-600">{job.budget}</span>
                </p>
                {/* <p className="text-gray-800 text-sm font-medium">
                  💵 Payment Type: <span className="text-blue-600">{job.payment_type}</span>
                </p> */}
              </div>

              {/* Dates */}
              <div className="mt-2 text-gray-600 text-xs">
                <p>
                  📅 Created At:{" "}
                  {job.created_at
                    ? new Date(job.created_at.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  ⏳ Deadline:{" "}
                  {job.deadline
                    ? new Date(job.deadline.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              {/* Apply Button */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-medium capitalize">
                  {job.status}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
