import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadIcon from "@mui/icons-material/Upload";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const AWSUpload = (
  pictureUrl: string,
  setPictureUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = React.useRef<any>(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
  };

  const handleFileUpload = () => {
    hiddenFileInput?.current?.click();
  };

  const uploadFile = async (file: File) => {
    const reqBody = {
      fileName: file.name,
      fileType: file.type,
    };

    return (
      <div>
        <LinearProgressWithLabel value={progress} />
        <input
          style={{ display: "none" }}
          ref={hiddenFileInput}
          type="file"
          onChange={handleFileInput}
        />
        <Button onClick={handleFileUpload}>
          <AddPhotoAlternateIcon />
          Choose Photo
        </Button>
        {selectedFile && (
          <Button onClick={() => uploadFile(selectedFile)}>
            <UploadIcon /> Upload
          </Button>
        )}
      </div>
    );
  };
};

export { AWSUpload };
