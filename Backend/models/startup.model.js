import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    logo: {
        type: String // URL to startup logo
    },
    foundedYear: {
        type: Number
    },
    industry: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        enum: ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'IPO'],
        default: 'Seed'
    },
    teamSize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
        default: '1-10'
    },
    funding: {
        type: String
    },
    technologies: [{
        type: String
    }],
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String,
        instagram: String
    },
    culture: {
        type: String
    },
    benefits: [{
        type: String
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Startup = mongoose.model("Startup", startupSchema);