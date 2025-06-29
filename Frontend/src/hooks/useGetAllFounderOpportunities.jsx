import { setAllFounderOpportunities } from "@/redux/opportunitySlice";
import { OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllFounderOpportunities = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllFounderOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${OPPORTUNITY_API_ENDPOINT}/founder`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setAllFounderOpportunities(res.data.opportunities));
        } else {
          setError("Failed to fetch opportunities.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllFounderOpportunities();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllFounderOpportunities;