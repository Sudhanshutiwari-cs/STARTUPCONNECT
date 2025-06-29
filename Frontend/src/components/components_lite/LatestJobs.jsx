import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job || {}); // Use job slice, not jobs
  const jobs = allJobs || []; // Ensure jobs is always an array

  console.log("LatestJobs - allJobs from Redux:", jobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {jobs.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500 text-lg">No Jobs Available</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities!</p>
          </div>
        ) : (
          jobs
            .slice(0, 6)
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job} />
              ) : (
                <div key={Math.random()} className="p-4 border rounded-lg">
                  <span className="text-red-500">Invalid Job Data</span>
                </div>
              )
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;