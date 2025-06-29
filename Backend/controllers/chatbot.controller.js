import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { Application } from "../models/application.model.js";

// Predefined responses for common queries
const predefinedResponses = {
  greeting: [
    "Hello! Welcome to our Job Portal. How can I help you today?",
    "Hi there! I'm here to assist you with your job search. What would you like to know?",
    "Welcome! I can help you find jobs, understand our platform, or answer any questions you have."
  ],
  
  howToApply: "To apply for a job: 1) Browse jobs on our Jobs page, 2) Click on a job that interests you, 3) Click the 'Apply' button, 4) Make sure your profile is complete with resume and skills.",
  
  howToSearch: "You can search for jobs by: 1) Using keywords in the search bar, 2) Filtering by location, salary, experience, 3) Browsing categories, 4) Using our advanced filters on the Jobs page.",
  
  profileHelp: "To update your profile: 1) Go to your Profile page, 2) Click the edit icon, 3) Update your information, skills, and upload your resume, 4) Save changes.",
  
  forgotPassword: "To reset your password: 1) Go to the login page, 2) Click 'Forgot Password', 3) Enter your email, 4) Check your email for reset instructions.",
  
  contactSupport: "You can contact our support team at support@jobportal.com or use the contact form on our website. We typically respond within 24 hours.",
  
  accountIssues: "For account issues: 1) Try logging out and back in, 2) Clear your browser cache, 3) Check if your email is verified, 4) Contact support if the problem persists.",
  
  jobNotifications: "To get job notifications: 1) Complete your profile with skills and preferences, 2) Enable notifications in your profile settings, 3) We'll send you relevant job alerts via email.",
  
  default: "I'm sorry, I didn't understand that. You can ask me about job searching, applying for jobs, profile management, or general platform questions. Type 'help' for more options."
};

const helpCommands = `
Here are some things I can help you with:

🔍 **Job Search:**
- "How do I search for jobs?"
- "How to apply for jobs?"
- "Job search tips"

👤 **Profile & Account:**
- "How to update profile?"
- "Forgot password"
- "Account issues"

🔔 **Notifications:**
- "Job notifications"
- "Email alerts"

📞 **Support:**
- "Contact support"
- "Help"

Just type your question naturally, and I'll do my best to help!
`;

// Intent detection function
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('commands')) {
    return 'help';
  }
  
  if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
    return 'howToApply';
  }
  
  if (lowerMessage.includes('search') || lowerMessage.includes('find job')) {
    return 'howToSearch';
  }
  
  if (lowerMessage.includes('profile') || lowerMessage.includes('update') || lowerMessage.includes('edit')) {
    return 'profileHelp';
  }
  
  if (lowerMessage.includes('password') || lowerMessage.includes('forgot') || lowerMessage.includes('reset')) {
    return 'forgotPassword';
  }
  
  if (lowerMessage.includes('support') || lowerMessage.includes('contact') || lowerMessage.includes('email')) {
    return 'contactSupport';
  }
  
  if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('issue')) {
    return 'accountIssues';
  }
  
  if (lowerMessage.includes('notification') || lowerMessage.includes('alert') || lowerMessage.includes('email')) {
    return 'jobNotifications';
  }
  
  return 'default';
};

// Get dynamic data based on user query
const getDynamicResponse = async (message, userId) => {
  const lowerMessage = message.toLowerCase();
  
  try {
    // Job count query
    if (lowerMessage.includes('how many jobs') || lowerMessage.includes('total jobs')) {
      const jobCount = await Job.countDocuments();
      return `We currently have ${jobCount} active job postings on our platform. You can browse them all on our Jobs page!`;
    }
    
    // Company count query
    if (lowerMessage.includes('how many companies') || lowerMessage.includes('total companies')) {
      const companyCount = await Company.countDocuments();
      return `We have ${companyCount} companies registered on our platform, offering diverse opportunities across various industries.`;
    }
    
    // User's application status
    if (lowerMessage.includes('my applications') || lowerMessage.includes('application status')) {
      if (!userId) {
        return "Please log in to view your application status. You can check all your applications on your Profile page.";
      }
      
      const applicationCount = await Application.countDocuments({ applicant: userId });
      const pendingCount = await Application.countDocuments({ applicant: userId, status: 'pending' });
      
      return `You have ${applicationCount} total applications. ${pendingCount} are still pending review. You can check detailed status on your Profile page.`;
    }
    
    // Recent jobs
    if (lowerMessage.includes('recent jobs') || lowerMessage.includes('latest jobs')) {
      const recentJobs = await Job.find()
        .populate('company', 'name')
        .sort({ createdAt: -1 })
        .limit(3);
      
      if (recentJobs.length === 0) {
        return "No recent jobs found. Please check back later!";
      }
      
      let response = "Here are the latest job postings:\n\n";
      recentJobs.forEach((job, index) => {
        response += `${index + 1}. ${job.title} at ${job.company.name} - ${job.location}\n`;
      });
      response += "\nVisit our Jobs page to see more details and apply!";
      
      return response;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting dynamic response:', error);
    return null;
  }
};

export const chatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.id; // From authentication middleware
    
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }
    
    // Try to get dynamic response first
    const dynamicResponse = await getDynamicResponse(message, userId);
    
    if (dynamicResponse) {
      return res.status(200).json({
        success: true,
        response: dynamicResponse,
        type: 'dynamic'
      });
    }
    
    // Fall back to intent-based responses
    const intent = detectIntent(message);
    
    let response;
    
    if (intent === 'help') {
      response = helpCommands;
    } else if (intent === 'greeting') {
      const greetings = predefinedResponses.greeting;
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } else {
      response = predefinedResponses[intent] || predefinedResponses.default;
    }
    
    return res.status(200).json({
      success: true,
      response: response,
      type: 'predefined'
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({
      success: false,
      message: "Sorry, I'm having trouble right now. Please try again later."
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    // This is a placeholder for chat history functionality
    // You could implement a ChatHistory model to store conversations
    return res.status(200).json({
      success: true,
      history: [],
      message: "Chat history feature coming soon!"
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving chat history"
    });
  }
};