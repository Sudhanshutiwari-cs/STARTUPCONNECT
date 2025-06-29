import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FounderOpportunitiesTable from "./FounderOpportunitiesTable";
import useGetAllFounderOpportunities from "@/hooks/useGetAllFounderOpportunities";
import { setSearchOpportunityByText } from "@/redux/opportunitySlice";

const FounderOpportunities = () => {
  useGetAllFounderOpportunities();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchOpportunityByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by role & startup"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/founder/opportunities/create")}>
            Post New Opportunity
          </Button>
        </div>
        <div>
          <FounderOpportunitiesTable />
        </div>
      </div>
    </div>
  );
};

export default FounderOpportunities;