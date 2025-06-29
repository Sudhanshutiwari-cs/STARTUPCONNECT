import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import Chatbot from "../chatbot/Chatbot";
import { useParams, useNavigate } from "react-router-dom";
import { OPPORTUNITY_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleOpportunity } from "@/redux/opportunitySlice";
import { toast } from "sonner";
import { 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  Building2,
  Star,
  Globe,
  Linkedin,
  Twitter,
  Github,
  ArrowLeft
} from "lucide-react";

const OpportunityDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const opportunityId = params.id;

  const { singleOpportunity } = useSelector((store) => store.opportunity);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleOpportunity?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyOpportunityHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${opportunityId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedOpportunity = {
          ...singleOpportunity,
          applications: [...singleOpportunity.applications, { applicant: user?._id }],
        };
        dispatch(setSingleOpportunity(updatedOpportunity));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleOpportunity = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${OPPORTUNITY_API_ENDPOINT}/get/${opportunityId}`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setSingleOpportunity(res.data.opportunity));
          setIsApplied(
            res.data.opportunity.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch opportunity details.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleOpportunity();
  }, [opportunityId, dispatch, user?._id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading opportunity details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !singleOpportunity) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error || "Opportunity not found"}</p>
            <Button onClick={() => navigate("/opportunities")} className="mt-4">
              Back to Opportunities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const startup = singleOpportunity.startup;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Back Button */}
        <Button 
          onClick={() => navigate("/opportunities")} 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {singleOpportunity.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{startup?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{singleOpportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{singleOpportunity.workType}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{singleOpportunity.opportunityType}</Badge>
                    <Badge variant="outline">{singleOpportunity.experienceLevel}</Badge>
                    {singleOpportunity.isUrgent && (
                      <Badge className="bg-red-500 text-white">Urgent Hiring</Badge>
                    )}
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {singleOpportunity.positions} Position{singleOpportunity.positions > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={isApplied ? null : applyOpportunityHandler}
                  disabled={isApplied}
                  className={`px-8 py-3 ${
                    isApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>

              {/* Salary Info */}
              {singleOpportunity.salary && (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    {singleOpportunity.salary.min && singleOpportunity.salary.max
                      ? `₹${singleOpportunity.salary.min}L - ₹${singleOpportunity.salary.max}L`
                      : "Competitive Salary"}
                    {singleOpportunity.salary.equity && (
                      <span className="text-blue-600 ml-2">+ Equity</span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About this Role</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {singleOpportunity.description}
              </p>
            </div>

            {/* Responsibilities */}
            {singleOpportunity.responsibilities && singleOpportunity.responsibilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>
                <ul className="space-y-2">
                  {singleOpportunity.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {singleOpportunity.requirements && singleOpportunity.requirements.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {singleOpportunity.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {singleOpportunity.skills && singleOpportunity.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {singleOpportunity.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Perks */}
            {singleOpportunity.perks && singleOpportunity.perks.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Perks & Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {singleOpportunity.perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Startup Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                {startup?.logo && (
                  <img 
                    src={startup.logo} 
                    alt={startup.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{startup?.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{startup?.rating || 'New'}</span>
                    {startup?.totalReviews > 0 && (
                      <span>({startup.totalReviews} reviews)</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span>{startup?.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{startup?.teamSize} employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{startup?.location}</span>
                </div>
                {startup?.stage && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {startup.stage}
                    </Badge>
                  </div>
                )}
              </div>

              {startup?.description && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {startup.description}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {startup?.socialLinks && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex gap-3">
                    {startup.socialLinks.website && (
                      <a 
                        href={startup.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {startup.socialLinks.linkedin && (
                      <a 
                        href={startup.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {startup.socialLinks.twitter && (
                      <a 
                        href={startup.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {startup.socialLinks.github && (
                      <a 
                        href={startup.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <Button 
                onClick={() => navigate(`/startup/${startup?._id}`)}
                variant="outline" 
                className="w-full mt-4"
              >
                View Startup Profile
              </Button>
            </div>

            {/* Application Deadline */}
            {singleOpportunity.applicationDeadline && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-orange-700">
                  <Calendar className="h-4 w-4" />
                  <span className="font-semibold">Application Deadline</span>
                </div>
                <p className="text-orange-600 text-sm mt-1">
                  {new Date(singleOpportunity.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold">
                    {singleOpportunity.applications?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-semibold">
                    {new Date(singleOpportunity.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge 
                    variant={singleOpportunity.status === 'Active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {singleOpportunity.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default OpportunityDescription;