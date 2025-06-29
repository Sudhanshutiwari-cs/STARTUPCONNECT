import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const filterOptions = [
  {
    filterType: "Industry",
    array: [
      "Technology",
      "FinTech",
      "HealthTech",
      "EdTech",
      "E-commerce",
      "SaaS",
      "AI/ML",
      "Blockchain",
      "IoT",
      "Gaming",
      "Media",
      "Food & Beverage",
      "Travel",
      "Real Estate",
      "Energy"
    ],
  },
  {
    filterType: "Stage",
    array: [
      "Idea",
      "Pre-Seed",
      "Seed",
      "Series A",
      "Series B", 
      "Series C+",
      "IPO"
    ],
  },
  {
    filterType: "Team Size",
    array: [
      "1-10",
      "11-50",
      "51-200", 
      "201-500",
      "500+"
    ],
  },
  {
    filterType: "Location",
    array: [
      "Bangalore",
      "Mumbai",
      "Delhi",
      "Pune",
      "Hyderabad",
      "Chennai",
      "Remote",
      "International"
    ],
  }
];

const StartupFilterCard = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSearchQuery("");
    onSearch("");
  };

  const hasActiveFilters = Object.values(selectedFilters).some(Boolean) || searchQuery;

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">Find Startups</h1>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <hr className="mb-4" />
      
      {/* Filters */}
      {filterOptions.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold text-md mb-2">{data.filterType}</h2>
          <div className="space-y-2">
            {data.array.map((item, indx) => {
              const isSelected = selectedFilters[data.filterType] === item;
              return (
                <div key={indx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${data.filterType}-${indx}`}
                    checked={isSelected}
                    onChange={() => handleFilterChange(data.filterType, item)}
                    className="rounded border-gray-300"
                  />
                  <label 
                    htmlFor={`${data.filterType}-${indx}`}
                    className={`text-sm cursor-pointer hover:text-blue-600 ${
                      isSelected ? 'text-blue-600 font-medium' : ''
                    }`}
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StartupFilterCard;