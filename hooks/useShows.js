import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

const useShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    publicApi.get("/shows")
      .then(response => {
        setShows(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  console.log('error', error);

  return { shows, loading, error };
};

export default useShows;
