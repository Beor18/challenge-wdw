import { useCallback, useEffect, useState } from "react";

const useFetch = (url, opt) => {
  const [resp, setResp] = useState({ data: {} });

  const fetching = useCallback(() => {
    setTimeout(() => {
      fetch(url, opt)
        .then((res) => res.json())
        .then((data) => setResp({ data }));
    }, 500);
  }, [url]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return resp;
};

export default useFetch;