import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [{
      type: String,
    }],
    responsibilities: [{
      type: String,
    }],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR'
      },
      equity: String
    },
    experienceLevel: {
      type: String,
      enum: ['Fresher', 'Junior', 'Mid-Level', 'Senior', 'Lead'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    workType: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      required: true,
    },
    opportunityType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Co-founder'],
      required: true,
    },
    positions: {
      type: Number,
      required: true,
      default: 1
    },
    skills: [{
      type: String,
    }],
    perks: [{
      type: String,
    }],
    applicationDeadline: {
      type: Date
    },
    isUrgent: {
      type: Boolean,
      default: false
    },
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    }],
    status: {
      type: String,
      enum: ['Active', 'Paused', 'Closed'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

export const Opportunity = mongoose.model("Opportunity", opportunitySchema);