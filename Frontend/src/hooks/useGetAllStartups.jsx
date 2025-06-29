import { setPublicStartups } from "@/redux/startupSlice";
import { STARTUP_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllStartups = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllStartups = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching public startups...");
        
        const res = await axios.get(`${STARTUP_API_ENDPOINT}/public`);
        
        console.log("Startups API Response:", res.data);
        
        if (res.data.success) {
          dispatch(setPublicStartups(res.data.startups || []));
        } else {
          setError("Failed to fetch startups.");
          dispatch(setPublicStartups([]));
        }
        
      } catch (error) {
        console.error("Fetch Startups Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
        setError(errorMessage);
        dispatch(setPublicStartups([]));
      } finally {
        setLoading(false);
      }
    };

    fetchAllStartups();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllStartups;