import { Job } from "../models/job.model.js";

//Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Users - Get all jobs with proper error handling
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    
    // Build query object
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    console.log("Fetching jobs with query:", query);
    console.log("Keyword:", keyword);

    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name logo location description website" // Select specific fields
      })
      .sort({ createdAt: -1 });

    console.log("Jobs found:", jobs.length);

    // Always return success with jobs array (even if empty)
    return res.status(200).json({ 
      jobs: jobs || [], 
      success: true,
      count: jobs.length,
      message: jobs.length > 0 ? "Jobs fetched successfully" : "No jobs found"
    });

  } catch (error) {
    console.error("Error in getAllJobs:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching jobs", 
      success: false,
      jobs: [] // Return empty array on error
    });
  }
};

//Users - Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    if (!jobId) {
      return res.status(400).json({ 
        message: "Job ID is required", 
        success: false 
      });
    }

    const job = await Job.findById(jobId)
      .populate({
        path: "company",
        select: "name logo location description website"
      })
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullname email"
        }
      });

    if (!job) {
      return res.status(404).json({ 
        message: "Job not found", 
        success: false 
      });
    }

    return res.status(200).json({ 
      job, 
      success: true 
    });

  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching job", 
      success: false 
    });
  }
};

//Admin - Get jobs created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    
    if (!adminId) {
      return res.status(401).json({ 
        message: "Unauthorized access", 
        success: false 
      });
    }

    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
        select: "name logo location"
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      jobs: jobs || [], 
      success: true,
      count: jobs.length 
    });

  } catch (error) {
    console.error("Error in getAdminJobs:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching admin jobs", 
      success: false,
      jobs: []
    });
  }
};