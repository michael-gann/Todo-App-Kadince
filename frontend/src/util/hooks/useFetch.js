import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState({});
  const [caughtError, setCaughtError] = useState({});
  const [serverError, setServerError] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (!json.error) {
          setData(json);
        } else {
          setServerError(json);
        }
      } catch (e) {
        setCaughtError({ e });
      }
    })();
  }, [url]);

  return { data, serverError, caughtError };
};
