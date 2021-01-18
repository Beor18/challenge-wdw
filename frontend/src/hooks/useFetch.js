import { useCallback, useEffect, useState } from "react";

const useFetch = (url, opt) => {
  const [resp, setResp] = useState({ data: {} });

  const fetching = useCallback(() => {
    setInterval(() => {
      fetch(url, opt)
        .then((res) => res.json())
        .then((data) => setResp({ data }));
    }, 1000);
  }, [url]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return resp;
};

export default useFetch;