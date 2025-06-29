import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { STARTUP_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleStartup } from "@/redux/startupSlice";
import axios from "axios";

const StartupCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    stage: "Seed",
    teamSize: "1-10"
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerNewStartup = async () => {
    try {
      const res = await axios.post(
        `${STARTUP_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      if (res?.data?.success) {
        dispatch(setSingleStartup(res.data.startup));
        toast.success(res.data.message);
        const startupId = res?.data?.startup?._id;
        navigate(`/founder/startups/${startupId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register startup");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Register Your Startup</h1>
          <p className="text-gray-600">
            Join the startup ecosystem and connect with talented individuals
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Startup Name *</Label>
            <Input
              type="text"
              name="startupName"
              placeholder="Enter your startup name"
              className="my-2"
              value={formData.startupName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Industry *</Label>
            <Input
              type="text"
              name="industry"
              placeholder="e.g., FinTech, HealthTech, EdTech"
              className="my-2"
              value={formData.industry}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Stage</Label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md my-2"
            >
              <option value="Idea">Idea</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Series C+">Series C+</option>
              <option value="IPO">IPO</option>
            </select>
          </div>

          <div>
            <Label>Team Size</Label>
            <select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md my-2"
            >
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/founder/startups")}
          >
            Cancel
          </Button>
          <Button 
            onClick={registerNewStartup}
            disabled={!formData.startupName || !formData.industry}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupCreate;