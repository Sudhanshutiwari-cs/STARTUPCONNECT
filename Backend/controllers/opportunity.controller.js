import { Opportunity } from "../models/opportunity.model.js";

export const postOpportunity = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      responsibilities,
      salary,
      location,
      workType,
      opportunityType,
      experienceLevel,
      positions,
      skills,
      perks,
      applicationDeadline,
      isUrgent,
      startupId,
    } = req.body;
    
    const userId = req.id;

    if (!title || !description || !location || !workType || !opportunityType || !experienceLevel || !startupId) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      requirements: requirements ? requirements.split(",").map(req => req.trim()) : [],
      responsibilities: responsibilities ? responsibilities.split(",").map(resp => resp.trim()) : [],
      salary: salary ? JSON.parse(salary) : undefined,
      location,
      workType,
      opportunityType,
      experienceLevel,
      positions: positions || 1,
      skills: skills ? skills.split(",").map(skill => skill.trim()) : [],
      perks: perks ? perks.split(",").map(perk => perk.trim()) : [],
      applicationDeadline: applicationDeadline || undefined,
      isUrgent: isUrgent || false,
      startup: startupId,
      created_by: userId,
    });

    res.status(201).json({
      message: "Opportunity posted successfully.",
      opportunity,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Server Error", 
      success: false 
    });
  }
};

export const getAllOpportunities = async (req, res) => {
  try {
    const { keyword, location, workType, opportunityType, experienceLevel, skills } = req.query;
    
    let query = { status: 'Active' };
    
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { skills: { $in: [new RegExp(keyword, "i")] } }
      ];
    }
    
    if (location) query.location = { $regex: location, $options: "i" };
    if (workType) query.workType = workType;
    if (opportunityType) query.opportunityType = opportunityType;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray.map(skill => new RegExp(skill, "i")) };
    }

    console.log("Fetching opportunities with query:", query);

    const opportunities = await Opportunity.find(query)
      .populate({
        path: "startup",
        select: "name logo location industry stage teamSize rating"
      })
      .sort({ isUrgent: -1, createdAt: -1 });

    console.log("Opportunities found:", opportunities.length);

    return res.status(200).json({ 
      opportunities: opportunities || [], 
      success: true,
      count: opportunities.length,
      message: opportunities.length > 0 ? "Opportunities fetched successfully" : "No opportunities found"
    });

  } catch (error) {
    console.error("Error in getAllOpportunities:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching opportunities", 
      success: false,
      opportunities: []
    });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    
    if (!opportunityId) {
      return res.status(400).json({ 
        message: "Opportunity ID is required", 
        success: false 
      });
    }

    const opportunity = await Opportunity.findById(opportunityId)
      .populate({
        path: "startup",
        select: "name logo location description website industry stage teamSize funding technologies culture benefits socialLinks rating totalReviews"
      })
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullname email profile.profilePhoto"
        }
      });

    if (!opportunity) {
      return res.status(404).json({ 
        message: "Opportunity not found", 
        success: false 
      });
    }

    return res.status(200).json({ 
      opportunity, 
      success: true 
    });

  } catch (error) {
    console.error("Error in getOpportunityById:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching opportunity", 
      success: false 
    });
  }
};

export const getFounderOpportunities = async (req, res) => {
  try {
    const founderId = req.id;
    
    if (!founderId) {
      return res.status(401).json({ 
        message: "Unauthorized access", 
        success: false 
      });
    }

    const opportunities = await Opportunity.find({ created_by: founderId })
      .populate({
        path: "startup",
        select: "name logo location industry"
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      opportunities: opportunities || [], 
      success: true,
      count: opportunities.length 
    });

  } catch (error) {
    console.error("Error in getFounderOpportunities:", error);
    return res.status(500).json({ 
      message: "Server Error while fetching founder opportunities", 
      success: false,
      opportunities: []
    });
  }
};

export const updateOpportunityStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const opportunityId = req.params.id;
    const userId = req.id;

    if (!status || !['Active', 'Paused', 'Closed'].includes(status)) {
      return res.status(400).json({
        message: "Valid status is required (Active, Paused, Closed)",
        success: false,
      });
    }

    const opportunity = await Opportunity.findOne({ 
      _id: opportunityId, 
      created_by: userId 
    });

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found or unauthorized",
        success: false,
      });
    }

    opportunity.status = status;
    await opportunity.save();

    return res.status(200).json({ 
      message: "Opportunity status updated successfully",
      success: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Server error", 
      success: false 
    });
  }
};