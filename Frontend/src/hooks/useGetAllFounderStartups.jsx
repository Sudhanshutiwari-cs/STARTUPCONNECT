import { setStartups } from "@/redux/startupSlice";
import { STARTUP_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllFounderStartups = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get(`${STARTUP_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setStartups(res.data.startups));
        }
      } catch (error) {
        console.error("Error fetching founder startups:", error);
      }
    };
    
    fetchStartups();
  }, [dispatch]);
};

export default useGetAllFounderStartups;