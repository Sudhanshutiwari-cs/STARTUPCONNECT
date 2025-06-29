import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Textarea } from "../ui/textarea.jsx";
import axios from "axios";
import { STARTUP_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetStartupById from "@/hooks/useGetStartupById.jsx";

const StartupSetup = () => {
  const params = useParams();
  useGetStartupById(params.id);
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    foundedYear: "",
    industry: "",
    stage: "",
    teamSize: "",
    funding: "",
    technologies: "",
    culture: "",
    benefits: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
      instagram: ""
    },
    file: null,
  });
  
  const { singleStartup } = useSelector((store) => store.startup);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSocialLinkHandler = (e) => {
    setInput({
      ...input,
      socialLinks: {
        ...input.socialLinks,
        [e.target.name]: e.target.value
      }
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("foundedYear", input.foundedYear);
    formData.append("industry", input.industry);
    formData.append("stage", input.stage);
    formData.append("teamSize", input.teamSize);
    formData.append("funding", input.funding);
    formData.append("technologies", input.technologies);
    formData.append("culture", input.culture);
    formData.append("benefits", input.benefits);
    formData.append("socialLinks", JSON.stringify(input.socialLinks));
    
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${STARTUP_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.success) {
        toast.success(res.data.message);
        navigate("/founder/startups");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleStartup.name || "",
      description: singleStartup.description || "",
      website: singleStartup.website || "",
      location: singleStartup.location || "",
      foundedYear: singleStartup.foundedYear || "",
      industry: singleStartup.industry || "",
      stage: singleStartup.stage || "",
      teamSize: singleStartup.teamSize || "",
      funding: singleStartup.funding || "",
      technologies: singleStartup.technologies?.join(", ") || "",
      culture: singleStartup.culture || "",
      benefits: singleStartup.benefits?.join(", ") || "",
      socialLinks: {
        linkedin: singleStartup.socialLinks?.linkedin || "",
        twitter: singleStartup.socialLinks?.twitter || "",
        github: singleStartup.socialLinks?.github || "",
        instagram: singleStartup.socialLinks?.instagram || ""
      },
      file: null,
    });
  }, [singleStartup]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/founder/startups")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Startup Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Startup Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            
            <div>
              <Label>Industry</Label>
              <Input
                type="text"
                name="industry"
                value={input.industry}
                onChange={changeEventHandler}
                placeholder="e.g., FinTech, HealthTech"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="url"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g., Bangalore, India"
              />
            </div>

            <div>
              <Label>Founded Year</Label>
              <Input
                type="number"
                name="foundedYear"
                value={input.foundedYear}
                onChange={changeEventHandler}
                placeholder="2023"
              />
            </div>

            <div>
              <Label>Stage</Label>
              <select
                name="stage"
                value={input.stage}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
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
                value={input.teamSize}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div>
              <Label>Funding</Label>
              <Input
                type="text"
                name="funding"
                value={input.funding}
                onChange={changeEventHandler}
                placeholder="e.g., $1M Seed Round"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Tell us about your startup..."
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Technologies (comma-separated)</Label>
              <Input
                type="text"
                name="technologies"
                value={input.technologies}
                onChange={changeEventHandler}
                placeholder="React, Node.js, Python, AWS"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Company Culture</Label>
              <Textarea
                name="culture"
                value={input.culture}
                onChange={changeEventHandler}
                placeholder="Describe your company culture..."
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Benefits (comma-separated)</Label>
              <Input
                type="text"
                name="benefits"
                value={input.benefits}
                onChange={changeEventHandler}
                placeholder="Health Insurance, Flexible Hours, Remote Work"
              />
            </div>

            {/* Social Links */}
            <div>
              <Label>LinkedIn</Label>
              <Input
                type="url"
                name="linkedin"
                value={input.socialLinks.linkedin}
                onChange={changeSocialLinkHandler}
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div>
              <Label>Twitter</Label>
              <Input
                type="url"
                name="twitter"
                value={input.socialLinks.twitter}
                onChange={changeSocialLinkHandler}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <Label>GitHub</Label>
              <Input
                type="url"
                name="github"
                value={input.socialLinks.github}
                onChange={changeSocialLinkHandler}
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <Label>Instagram</Label>
              <Input
                type="url"
                name="instagram"
                value={input.socialLinks.instagram}
                onChange={changeSocialLinkHandler}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="md:col-span-2">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Startup
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StartupSetup;