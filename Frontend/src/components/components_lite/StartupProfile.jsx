import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Chatbot from "../chatbot/Chatbot";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github,
  Star,
  Building2,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { STARTUP_API_ENDPOINT, OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import OpportunityCard from "./OpportunityCard";

const StartupProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const startupId = params.id;
  
  const [startup, setStartup] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        setLoading(true);
        
        // Fetch startup details
        const startupRes = await axios.get(`${STARTUP_API_ENDPOINT}/public/${startupId}`);
        if (startupRes.data.success) {
          setStartup(startupRes.data.startup);
        }

        // Fetch startup opportunities
        const opportunitiesRes = await axios.get(
          `${OPPORTUNITY_API_ENDPOINT}/get?startup=${startupId}`
        );
        if (opportunitiesRes.data.success) {
          setOpportunities(opportunitiesRes.data.opportunities || []);
        }

      } catch (error) {
        console.error("Error fetching startup data:", error);
        setError("Failed to load startup information");
      } finally {
        setLoading(false);
      }
    };

    if (startupId) {
      fetchStartupData();
    }
  }, [startupId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading startup profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error || "Startup not found"}</p>
            <Button onClick={() => navigate("/startups")} className="mt-4">
              Back to Startups
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Back Button */}
        <Button 
          onClick={() => navigate("/startups")} 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Startups
        </Button>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start gap-6">
            {startup.logo && (
              <img 
                src={startup.logo} 
                alt={startup.name}
                className="w-24 h-24 rounded-lg object-cover border"
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                {startup.isVerified && (
                  <Badge className="bg-blue-500 text-white">Verified</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{startup.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{startup.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{startup.teamSize} employees</span>
                </div>
                {startup.foundedYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {startup.foundedYear}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{startup.stage}</Badge>
                {startup.funding && (
                  <Badge variant="outline" className="text-green-600">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {startup.funding}
                  </Badge>
                )}
                {startup.rating > 0 && (
                  <Badge variant="outline" className="text-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    {startup.rating} ({startup.totalReviews} reviews)
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {startup.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {startup.website && (
                  <a 
                    href={startup.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {startup.socialLinks?.linkedin && (
                  <a 
                    href={startup.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {startup.socialLinks?.twitter && (
                  <a 
                    href={startup.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                )}
                {startup.socialLinks?.github && (
                  <a 
                    href={startup.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Technologies */}
            {startup.technologies && startup.technologies.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Technologies We Use</h2>
                <div className="flex flex-wrap gap-2">
                  {startup.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Culture */}
            {startup.culture && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Our Culture</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {startup.culture}
                </p>
              </div>
            )}

            {/* Benefits */}
            {startup.benefits && startup.benefits.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {startup.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Open Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Open Opportunities ({opportunities.length})
              </h2>
              
              {opportunities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No open opportunities at the moment</p>
                  <p className="text-gray-400 text-sm mt-1">Check back later for new openings!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <OpportunityCard 
                      key={opportunity._id} 
                      opportunity={opportunity}
                      showStartupInfo={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stage</span>
                  <Badge variant="outline">{startup.stage}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Team Size</span>
                  <span className="font-semibold">{startup.teamSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-semibold">{startup.industry}</span>
                </div>
                {startup.foundedYear && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-semibold">{startup.foundedYear}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Open Roles</span>
                  <span className="font-semibold">{opportunities.length}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{startup.location}</span>
                </div>
                {startup.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => navigate("/opportunities")}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                View All Opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default StartupProfile;