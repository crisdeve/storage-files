import { Button } from "@shopify/polaris";
import { useState } from "react";
import { useLoadedFile } from "../../hooks/useLoadedFile";
import { useStorageFiles } from "../../hooks/useStorageFiles";
import { useUploadFiles } from "../../hooks/useUploadFiles";

export const FormFile = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [apiStorage, storage, setStorage, storaging] = useStorageFiles();
  const [updateLoaded, loaded, setLoaded] = useLoadedFile();

  const submitFile = async (e) => {
    e.preventDefault();
    const newStorage = await apiStorage(files);
    setStorage(newStorage);

    newStorage.map(async (upload, i) => await useUploadFiles(upload, files[i]));
    const loadedFile = await Promise.all(updateLoaded(newStorage));

    console.log(await Promise.all(loadedFile));
    setLoaded(loadedFile);
  };

  return (
    <form onSubmit={submitFile}>
      {children({ files, setFiles })}

      <Button submit>{storaging ? "..." : "Add files"}</Button>

      {storage.length > 0 && `create storage of ${storage.length} files`}
      {loaded.length > 0 && `- ${loaded.length} files was loaded...`}
    </form>
  );
};
