import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching jobs with searchedQuery:", searchedQuery);
        
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery || ""}`,
          {
            withCredentials: true,
          }
        );
        
        console.log("API Response:", res.data);
        
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs || []));
        } else {
          setError("Failed to fetch jobs.");
          dispatch(setAllJobs([])); // Set empty array on failure
        }
        
      } catch (error) {
        console.error("Fetch Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
        setError(errorMessage);
        dispatch(setAllJobs([])); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);

  return { loading, error };
};

export default useGetAllJobs;