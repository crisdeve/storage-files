import { useState } from "react";
import { useAuthenticatedFetch } from ".";

export const useLoadedFile = () => {
  const fetch = useAuthenticatedFetch();
  const [loaded, setLoaded] = useState([]);

  const updateLoaded = (storages) => {
    return storages.map(async (uploaded) => {
      const loadedFile = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploaded),
      });

      const r = await loadedFile.json();
      return r;
    });
  };

  return [updateLoaded, loaded, setLoaded];
};
