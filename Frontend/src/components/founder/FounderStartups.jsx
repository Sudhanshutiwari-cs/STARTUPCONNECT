import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FounderStartupsTable from "./FounderStartupsTable";
import useGetAllFounderStartups from "@/hooks/useGetAllFounderStartups";
import { setSearchStartupByText } from "@/redux/startupSlice";

const FounderStartups = () => {
  useGetAllFounderStartups();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchStartupByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by startup name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/founder/startups/create")}>
            Register New Startup
          </Button>
        </div>
        <div>
          <FounderStartupsTable />
        </div>
      </div>
    </div>
  );
};

export default FounderStartups;