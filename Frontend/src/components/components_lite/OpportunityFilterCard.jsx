import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/opportunitySlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Remote",
      "Bangalore",
      "Mumbai", 
      "Delhi",
      "Pune",
      "Hyderabad",
      "Chennai",
      "Kolkata"
    ],
  },
  {
    filterType: "Work Type",
    array: [
      "Remote",
      "On-site", 
      "Hybrid"
    ],
  },
  {
    filterType: "Opportunity Type",
    array: [
      "Full-time",
      "Part-time", 
      "Internship",
      "Contract",
      "Co-founder"
    ],
  },
  {
    filterType: "Experience Level",
    array: [
      "Fresher",
      "Junior", 
      "Mid-Level",
      "Senior",
      "Lead"
    ],
  },
  {
    filterType: "Startup Stage",
    array: [
      "Idea",
      "Pre-Seed",
      "Seed", 
      "Series A",
      "Series B",
      "Series C+"
    ],
  },
  {
    filterType: "Skills",
    array: [
      "React",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "Go",
      "Rust",
      "Machine Learning",
      "Data Science",
      "DevOps",
      "UI/UX Design",
      "Product Management",
      "Marketing",
      "Sales"
    ],
  }
];

const OpportunityFilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const clearFilters = () => {
    setSelectedValue("");
  };

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">Filter Opportunities</h1>
        {selectedValue && (
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear
          </button>
        )}
      </div>
      
      <hr className="mb-4" />
      
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold text-md mb-2">{data.filterType}</h2>
            {data.array.map((item, indx) => {
              const itemId = `filter-${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <label 
                    htmlFor={itemId} 
                    className="text-sm cursor-pointer hover:text-blue-600"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default OpportunityFilterCard;