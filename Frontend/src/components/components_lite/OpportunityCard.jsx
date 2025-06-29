import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Building2,
  Star,
  Bookmark,
  Zap
} from "lucide-react";

const OpportunityCard = ({ opportunity, showStartupInfo = true }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const getSalaryDisplay = (salary) => {
    if (!salary) return "Competitive";
    if (salary.min && salary.max) {
      return `₹${salary.min}L - ₹${salary.max}L`;
    }
    return "Competitive";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                onClick={() => navigate(`/opportunity/${opportunity._id}`)}>
              {opportunity.title}
            </h3>
            {opportunity.isUrgent && (
              <Badge className="bg-red-500 text-white text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
          
          {showStartupInfo && opportunity.startup && (
            <div className="flex items-center gap-2 mb-3">
              {opportunity.startup.logo && (
                <img 
                  src={opportunity.startup.logo} 
                  alt={opportunity.startup.name}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <div>
                <p className="font-medium text-gray-800">{opportunity.startup.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {opportunity.startup.industry}
                  </span>
                  {opportunity.startup.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {opportunity.startup.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {daysAgoFunction(opportunity.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(opportunity.createdAt)}d ago`}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {opportunity.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="text-blue-600">
          {opportunity.opportunityType}
        </Badge>
        <Badge variant="outline" className="text-purple-600">
          {opportunity.experienceLevel}
        </Badge>
        <Badge variant="outline" className="text-green-600">
          {opportunity.workType}
        </Badge>
        {opportunity.startup?.stage && (
          <Badge variant="outline" className="text-orange-600">
            {opportunity.startup.stage}
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{opportunity.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4" />
          <span>{opportunity.positions} position{opportunity.positions > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span>{getSalaryDisplay(opportunity.salary)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{opportunity.workType}</span>
        </div>
      </div>

      {/* Skills */}
      {opportunity.skills && opportunity.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {opportunity.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {opportunity.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{opportunity.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{opportunity.applications?.length || 0} applicants</span>
          {opportunity.applicationDeadline && (
            <span>• Deadline: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/opportunity/${opportunity._id}`)}
            variant="outline"
            size="sm"
          >
            View Details
          </Button>
          <Button
            onClick={() => navigate(`/opportunity/${opportunity._id}`)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;