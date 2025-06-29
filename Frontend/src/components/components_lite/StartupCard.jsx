import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  MapPin, 
  Users, 
  Building2,
  Star,
  TrendingUp,
  Globe,
  Calendar
} from "lucide-react";

const StartupCard = ({ startup }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {startup.logo && (
          <img 
            src={startup.logo} 
            alt={startup.name}
            className="w-16 h-16 rounded-lg object-cover border"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                onClick={() => navigate(`/startup/${startup._id}`)}>
              {startup.name}
            </h3>
            {startup.isVerified && (
              <Badge className="bg-blue-500 text-white text-xs">Verified</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {startup.industry}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {startup.location}
            </span>
            {startup.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                {startup.rating}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-blue-600">
              {startup.stage}
            </Badge>
            <Badge variant="outline" className="text-green-600">
              {startup.teamSize} employees
            </Badge>
            {startup.foundedYear && (
              <Badge variant="outline" className="text-purple-600">
                Est. {startup.foundedYear}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {startup.description}
      </p>

      {/* Technologies */}
      {startup.technologies && startup.technologies.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-1">
            {startup.technologies.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {startup.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{startup.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4" />
          <span>{startup.teamSize}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <TrendingUp className="h-4 w-4" />
          <span>{startup.stage}</span>
        </div>
        {startup.funding && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-green-600">💰</span>
            <span>{startup.funding}</span>
          </div>
        )}
        {startup.website && (
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="h-4 w-4" />
            <a 
              href={startup.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Website
            </a>
          </div>
        )}
      </div>

      {/* Benefits Preview */}
      {startup.benefits && startup.benefits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Benefits:</p>
          <div className="flex flex-wrap gap-1">
            {startup.benefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {benefit}
              </span>
            ))}
            {startup.benefits.length > 3 && (
              <span className="text-xs text-gray-500">
                +{startup.benefits.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {startup.totalReviews > 0 ? (
            <span>{startup.totalReviews} reviews</span>
          ) : (
            <span>New startup</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/startup/${startup._id}`)}
            variant="outline"
            size="sm"
          >
            View Profile
          </Button>
          <Button
            onClick={() => navigate("/opportunities")}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            View Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;