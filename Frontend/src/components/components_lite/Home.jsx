import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import Chatbot from "../chatbot/Chatbot";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const { allJobs } = useSelector((state) => state.job || {}); // Use job slice
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  console.log("Home - Jobs from Redux:", { loading, error, allJobs });

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-lg">Loading jobs...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-gray-500 text-sm mt-2">Please try refreshing the page</p>
        </div>
      )}
      
      {!loading && !error && <LatestJobs />}
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;