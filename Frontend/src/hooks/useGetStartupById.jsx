import { setSingleStartup } from "@/redux/startupSlice";
import { STARTUP_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetStartupById = (startupId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleStartup = async () => {
      try {
        const res = await axios.get(
          `${STARTUP_API_ENDPOINT}/get/${startupId}`,
          { withCredentials: true }
        );
        
        if (res.data.success) {
          dispatch(setSingleStartup(res.data.startup));
        }
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    if (startupId) {
      fetchSingleStartup();
    }
  }, [startupId, dispatch]);
};

export default useGetStartupById;