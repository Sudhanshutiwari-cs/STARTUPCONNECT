import { Startup } from "../models/startup.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';

export const registerStartup = async (req, res) => {
  try {
    const { startupName, industry, stage, teamSize } = req.body;
    
    if (!startupName || !industry) {
      return res.status(400).json({
        message: "Startup name and industry are required",
        success: false,
      });
    }

    let startup = await Startup.findOne({ name: startupName });
    if (startup) {
      return res.status(400).json({
        message: "Startup already exists",
        success: false,
      });
    }

    startup = await Startup.create({
      name: startupName,
      industry,
      stage: stage || 'Seed',
      teamSize: teamSize || '1-10',
      userId: req.id,
    });

    return res.status(201).json({
      message: "Startup registered successfully.",
      startup,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllStartups = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const startups = await Startup.find({ userId });
    
    if (!startups) {
      return res.status(404).json({ 
        message: "No startups found",
        success: false 
      });
    }

    return res.status(200).json({
      startups,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getPublicStartups = async (req, res) => {
  try {
    const { industry, stage, location, search } = req.query;
    
    let query = {};
    
    if (industry) query.industry = { $regex: industry, $options: "i" };
    if (stage) query.stage = stage;
    if (location) query.location = { $regex: location, $options: "i" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { technologies: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const startups = await Startup.find(query)
      .select('-userId') // Don't expose user IDs
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      startups,
      success: true,
      count: startups.length
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getStartupById = async (req, res) => {
  try {
    const startupId = req.params.id;
    const startup = await Startup.findById(startupId);
    
    if (!startup) {
      return res.status(404).json({ 
        message: "Startup not found",
        success: false 
      });
    }

    return res.status(200).json({ 
      startup, 
      success: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateStartup = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      website, 
      location, 
      foundedYear,
      industry,
      stage,
      teamSize,
      funding,
      technologies,
      culture,
      benefits,
      socialLinks
    } = req.body;
    
    const file = req.file;
    let logo;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { 
      name, 
      description, 
      website, 
      location, 
      foundedYear,
      industry,
      stage,
      teamSize,
      funding,
      technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : undefined,
      culture,
      benefits: benefits ? benefits.split(',').map(benefit => benefit.trim()) : undefined,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : undefined
    };

    if (logo) updateData.logo = logo;

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const startup = await Startup.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!startup) {
      return res.status(404).json({ 
        message: "Startup not found",
        success: false 
      });
    }

    return res.status(200).json({ 
      message: "Startup updated successfully",
      startup,
      success: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};