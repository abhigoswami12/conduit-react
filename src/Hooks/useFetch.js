import { useState, useEffect } from "react";

function useFetch(url, options) {
  let [data, setIsData] = useState(null);
  let [errors, setErrors] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setIsData(data);
      })
      .catch(errors => setErrors(errors));
  }, []);
  return { data, errors };
}
export default useFetch;
