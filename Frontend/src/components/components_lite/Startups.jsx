import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StartupCard from "./StartupCard";
import StartupFilterCard from "./StartupFilterCard";
import Chatbot from "../chatbot/Chatbot";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllStartups from "@/hooks/useGetAllStartups";

const Startups = () => {
  useGetAllStartups();
  const { publicStartups } = useSelector((store) => store.startup);
  const [filterStartups, setFilterStartups] = useState(publicStartups);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilterStartups(publicStartups);
      return;
    }

    const filteredStartups = publicStartups.filter((startup) => {
      const query = searchQuery.toLowerCase();
      return (
        startup.name?.toLowerCase().includes(query) ||
        startup.description?.toLowerCase().includes(query) ||
        startup.industry?.toLowerCase().includes(query) ||
        startup.location?.toLowerCase().includes(query) ||
        startup.technologies?.some(tech => tech.toLowerCase().includes(query))
      );
    });

    setFilterStartups(filteredStartups);
  }, [publicStartups, searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-1/5">
            <StartupFilterCard onSearch={setSearchQuery} />
          </div>

          {filterStartups.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Startups Found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filterStartups.length} Innovative Startups
                </h2>
                <p className="text-gray-600">Discover companies that are changing the world</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterStartups.map((startup) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={startup._id}
                  >
                    <StartupCard startup={startup} />
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

export default Startups;