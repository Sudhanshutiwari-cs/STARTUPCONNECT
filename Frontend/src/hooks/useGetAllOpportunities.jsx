import { setAllOpportunities } from "@/redux/opportunitySlice";
import { OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllOpportunities = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector((store) => store.opportunity);

  useEffect(() => {
    const fetchAllOpportunities = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching opportunities with searchedQuery:", searchedQuery);
        
        const res = await axios.get(
          `${OPPORTUNITY_API_ENDPOINT}/get?keyword=${searchedQuery || ""}`,
          {
            withCredentials: true,
          }
        );
        
        console.log("API Response:", res.data);
        
        if (res.data.success) {
          dispatch(setAllOpportunities(res.data.opportunities || []));
        } else {
          setError("Failed to fetch opportunities.");
          dispatch(setAllOpportunities([]));
        }
        
      } catch (error) {
        console.error("Fetch Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
        setError(errorMessage);
        dispatch(setAllOpportunities([]));
      } finally {
        setLoading(false);
      }
    };

    fetchAllOpportunities();
  }, [dispatch, searchedQuery]);

  return { loading, error };
};

export default useGetAllOpportunities;