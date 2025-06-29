import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, Rocket, TrendingUp, Users, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/opportunitySlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchOpportunityHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/opportunities");
  };

  const stats = [
    { icon: Rocket, label: "Active Startups", value: "500+" },
    { icon: TrendingUp, label: "Opportunities", value: "1,200+" },
    { icon: Users, label: "Talent Connected", value: "10,000+" },
    { icon: Zap, label: "Success Stories", value: "250+" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex flex-col gap-6 my-10">
            <span className="px-6 mx-auto flex justify-center items-center py-3 gap-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
              <Rocket className="h-4 w-4" />
              Where Innovation Meets Talent
            </span>

            <h1 className="text-6xl font-bold leading-tight">
              Connect with <br />
              <span className="text-blue-600">Game-Changing</span>{" "}
              <span className="text-orange-500">Startups</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting opportunities at innovative startups. Join the next generation 
              of companies that are reshaping industries and building the future.
            </p>
            
            <div className="flex w-[50%] shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto bg-white">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search startups, roles, or technologies..."
                className="outline-none border-none w-full py-4 text-lg"
              />
              <Button 
                onClick={searchOpportunityHandler} 
                className="rounded-r-full px-8 py-4 bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                onClick={() => navigate("/opportunities")} 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
              >
                Browse Opportunities
              </Button>
              <Button 
                onClick={() => navigate("/startups")} 
                variant="outline" 
                className="px-6 py-3"
              >
                Explore Startups
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;