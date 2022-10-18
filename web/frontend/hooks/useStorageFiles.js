import { useState } from "react";
import { useAuthenticatedFetch } from ".";

export const useStorageFiles = () => {
  const fetch = useAuthenticatedFetch();
  const [loading, setLoading] = useState(false);
  const [storage, setStorage] = useState([]);

  const uploadStorage = async (files) => {
    setLoading(true);
    const filesData = [
      ...files.map((file) => {
        return {
          resource: "FILE",
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size.toString(),
          httpMethod: "POST",
        };
      }),
    ];

    const response = await fetch("/api/storage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: filesData }),
    });

    const {
      data: {
        body: {
          data: {
            stagedUploadsCreate: { stagedTargets },
          },
        },
      },
    } = await response.json();

    setLoading(false);
    return stagedTargets;
  };

  return [uploadStorage, storage, setStorage, loading];
};
