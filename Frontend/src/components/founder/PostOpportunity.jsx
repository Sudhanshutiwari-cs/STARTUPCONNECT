import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostOpportunity = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    salary: {
      min: "",
      max: "",
      equity: ""
    },
    location: "",
    workType: "",
    opportunityType: "",
    experienceLevel: "",
    positions: 1,
    skills: "",
    perks: "",
    applicationDeadline: "",
    isUrgent: false,
    startupId: "",
  });
  
  const navigate = useNavigate();
  const { startups } = useSelector((store) => store.startup);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSalaryHandler = (e) => {
    setInput({
      ...input,
      salary: {
        ...input.salary,
        [e.target.name]: e.target.value
      }
    });
  };

  const selectChangeHandler = (value, field) => {
    setInput({ ...input, [field]: value });
  };

  const selectStartupHandler = (value) => {
    const selectedStartup = startups.find(
      (startup) => startup.name.toLowerCase() === value
    );
    setInput({ ...input, startupId: selectedStartup._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const payload = {
        ...input,
        salary: JSON.stringify(input.salary)
      };
      
      const res = await axios.post(`${OPPORTUNITY_API_ENDPOINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/founder/opportunities");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-300 shadow-lg rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Post New Opportunity</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Job Title *</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="e.g., Senior Frontend Developer"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label>Location *</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="e.g., Bangalore, Remote"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label>Work Type *</Label>
              <Select onValueChange={(value) => selectChangeHandler(value, 'workType')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Opportunity Type *</Label>
              <Select onValueChange={(value) => selectChangeHandler(value, 'opportunityType')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select opportunity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Co-founder">Co-founder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Experience Level *</Label>
              <Select onValueChange={(value) => selectChangeHandler(value, 'experienceLevel')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresher">Fresher</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                placeholder="1"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                min="1"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Salary Range</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input
                  type="number"
                  name="min"
                  value={input.salary.min}
                  placeholder="Min (LPA)"
                  onChange={changeSalaryHandler}
                />
                <Input
                  type="number"
                  name="max"
                  value={input.salary.max}
                  placeholder="Max (LPA)"
                  onChange={changeSalaryHandler}
                />
                <Input
                  type="text"
                  name="equity"
                  value={input.salary.equity}
                  placeholder="Equity %"
                  onChange={changeSalaryHandler}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label>Skills Required</Label>
              <Input
                type="text"
                name="skills"
                value={input.skills}
                placeholder="React, Node.js, Python (comma-separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Perks & Benefits</Label>
              <Input
                type="text"
                name="perks"
                value={input.perks}
                placeholder="Health Insurance, Flexible Hours, Stock Options (comma-separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Application Deadline</Label>
              <Input
                type="date"
                name="applicationDeadline"
                value={input.applicationDeadline}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isUrgent"
                checked={input.isUrgent}
                onChange={(e) => setInput({ ...input, isUrgent: e.target.checked })}
              />
              <Label htmlFor="isUrgent">Mark as Urgent Hiring</Label>
            </div>

            <div className="md:col-span-2">
              <Label>Job Description *</Label>
              <Textarea
                name="description"
                value={input.description}
                placeholder="Describe the role, what you're looking for, and what makes this opportunity exciting..."
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                rows={4}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>Requirements</Label>
              <Textarea
                name="requirements"
                value={input.requirements}
                placeholder="List the key requirements for this role (comma-separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Key Responsibilities</Label>
              <Textarea
                name="responsibilities"
                value={input.responsibilities}
                placeholder="List the main responsibilities for this role (comma-separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventHandler}
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Select Startup *</Label>
              {startups.length > 0 ? (
                <Select onValueChange={selectStartupHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your startup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {startups.map((startup) => (
                        <SelectItem
                          key={startup._id}
                          value={startup.name.toLowerCase()}
                        >
                          {startup.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 text-sm">
                  Please register a startup first to post opportunities.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            {loading ? (
              <Button className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                disabled={startups.length === 0}
              >
                Post Opportunity
              </Button>
            )}
          </div>

          {startups.length === 0 && (
            <p className="text-sm font-bold my-3 text-center text-red-600">
              *Please register a startup first to post opportunities.*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostOpportunity;