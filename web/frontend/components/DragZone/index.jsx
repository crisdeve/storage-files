import { DropZone, Stack, Thumbnail, Caption } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import { useCallback } from "react";

export const DragZone = ({ files, setFiles }) => {
  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
  }, []);

  const validImageTypes = ["image/gif", "image/jpeg", "image/png", "video/mp4"];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png and .mp4" />
  );

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
};
