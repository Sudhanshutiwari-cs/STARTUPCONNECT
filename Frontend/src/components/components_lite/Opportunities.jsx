import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./OpportunityFilterCard";
import OpportunityCard from "./OpportunityCard";
import Chatbot from "../chatbot/Chatbot";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllOpportunities from "@/hooks/useGetAllOpportunities";

const Opportunities = () => {
  useGetAllOpportunities();
  const { allOpportunities, searchedQuery } = useSelector((store) => store.opportunity);
  const [filterOpportunities, setFilterOpportunities] = useState(allOpportunities);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterOpportunities(allOpportunities);
      return;
    }

    const filteredOpportunities = allOpportunities.filter((opportunity) => {
      const query = searchedQuery.toLowerCase();
      return (
        opportunity.title?.toLowerCase().includes(query) ||
        opportunity.description?.toLowerCase().includes(query) ||
        opportunity.location?.toLowerCase().includes(query) ||
        opportunity.skills?.some(skill => skill.toLowerCase().includes(query)) ||
        opportunity.startup?.name?.toLowerCase().includes(query)
      );
    });

    setFilterOpportunities(filteredOpportunities);
  }, [allOpportunities, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filterOpportunities.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Opportunities Found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filterOpportunities.length} Opportunities Found
                </h2>
                <p className="text-gray-600">Discover your next career opportunity</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterOpportunities.map((opportunity) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={opportunity._id}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Opportunities;